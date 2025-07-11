import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertUserSchema, insertNoteSchema, loginSchema } from "@shared/schema";
import { z } from "zod";
import "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration/login
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Store user in session
      req.session.userId = user.id;
      
      res.json({ 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(loginData.email);
      
      if (!user) {
        return res.status(401).json({ message: "User not found. Please sign up first." });
      }
      
      // In a real app, you'd verify the password hash here
      // For this demo, we'll check if the user exists and has registered
      if (!user.name || user.name.trim() === "") {
        return res.status(401).json({ message: "Invalid account. Please sign up again." });
      }
      
      // Store user in session
      req.session.userId = user.id;
      
      res.json({ 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/auth/google", async (req, res) => {
    try {
      const { name, email, avatar } = req.body;
      
      // Validate that we have the required Google user data
      if (!name || !email) {
        return res.status(400).json({ message: "Invalid Google user data" });
      }
      
      let user = await storage.getUserByEmail(email);
      
      // If user doesn't exist, create them with Google data
      if (!user) {
        user = await storage.createUser({
          name,
          email,
          avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=ffffff`,
          provider: "google",
          providerId: email,
        });
      }
      
      // Store user in session
      req.session.userId = user.id;
      
      res.json({ 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }
      });
    } catch (error) {
      console.error("Google auth error:", error);
      res.status(500).json({ message: "Failed to authenticate with Google" });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      res.json({ 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }
      });
    } catch (error) {
      console.error("Error in /api/auth/me:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Notes routes
  app.get("/api/notes", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const notes = await storage.getNotesByUserId(userId);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notes" });
    }
  });

  app.post("/api/notes", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const noteData = insertNoteSchema.parse({ ...req.body, userId });
      const note = await storage.createNote(noteData);
      
      // Broadcast real-time update
      (app as any).broadcastUpdate('note_created', note);
      
      res.json(note);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Failed to create note" });
    }
  });

  app.delete("/api/notes/:id", async (req, res) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const noteId = parseInt(req.params.id);
      const deleted = await storage.deleteNote(noteId, userId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Note not found" });
      }
      
      // Broadcast real-time update
      (app as any).broadcastUpdate('note_deleted', { id: noteId, userId });
      
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete note" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store active connections
  const connections = new Map<WebSocket, { userId?: number }>();
  
  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    connections.set(ws, {});
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Handle user authentication for WebSocket
        if (data.type === 'auth' && data.userId) {
          const connectionInfo = connections.get(ws);
          if (connectionInfo) {
            connectionInfo.userId = data.userId;
            connections.set(ws, connectionInfo);
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('WebSocket connection closed');
      connections.delete(ws);
    });
  });
  
  // Helper function to broadcast updates to all connected users
  function broadcastUpdate(type: string, data: any) {
    connections.forEach((connectionInfo, ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type,
          data,
          timestamp: new Date().toISOString()
        }));
      }
    });
  }
  
  // Store broadcast function for use in routes
  (app as any).broadcastUpdate = broadcastUpdate;
  
  return httpServer;
}
