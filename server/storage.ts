import { users, notes, type User, type InsertUser, type Note, type InsertNote } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Note methods
  getNotesByUserId(userId: number): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  deleteNote(id: number, userId: number): Promise<boolean>;
  updateNote(id: number, userId: number, updates: Partial<InsertNote>): Promise<Note | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private notes: Map<number, Note>;
  private currentUserId: number;
  private currentNoteId: number;

  constructor() {
    this.users = new Map();
    this.notes = new Map();
    this.currentUserId = 1;
    this.currentNoteId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      avatar: insertUser.avatar ?? null,
      provider: insertUser.provider ?? "email",
      providerId: insertUser.providerId ?? null,
    };
    this.users.set(id, user);
    return user;
  }

  async getNotesByUserId(userId: number): Promise<Note[]> {
    return Array.from(this.notes.values())
      .filter(note => note.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const id = this.currentNoteId++;
    const now = new Date();
    const note: Note = {
      ...insertNote,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.notes.set(id, note);
    return note;
  }

  async deleteNote(id: number, userId: number): Promise<boolean> {
    const note = this.notes.get(id);
    if (!note || note.userId !== userId) {
      return false;
    }
    return this.notes.delete(id);
  }

  async updateNote(id: number, userId: number, updates: Partial<InsertNote>): Promise<Note | undefined> {
    const note = this.notes.get(id);
    if (!note || note.userId !== userId) {
      return undefined;
    }
    
    const updatedNote = {
      ...note,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.notes.set(id, updatedNote);
    return updatedNote;
  }
}

export const storage = new MemStorage();
