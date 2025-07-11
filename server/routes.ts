import type { Express } from "express";
import { createServer, type Server } from "http";
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
      
      const user = await storage.getUserByEmail(loginData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
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
      // Mock Google OAuth for now - in production would use NextAuth
      const { name, email, avatar } = req.body;
      
      let user = await storage.getUserByEmail(email);
      
      if (!user) {
        user = await storage.createUser({
          name,
          email,
          avatar,
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
      
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete note" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
