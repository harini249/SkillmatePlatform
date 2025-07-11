import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNoteSchema, type InsertNote } from "@shared/schema";
import { useNotes } from "@/hooks/use-notes";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, StickyNote, Trophy, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { notes, createNote, deleteNote, isCreating, isDeleting } = useNotes();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<InsertNote, "userId">>({
    resolver: zodResolver(insertNoteSchema.omit({ userId: true })),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: Omit<InsertNote, "userId">) => {
    createNote(data, {
      onSuccess: () => {
        reset();
        toast({
          title: "Note created!",
          description: "Your learning note has been saved successfully.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to create note. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  const handleDeleteNote = (id: number) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id, {
        onSuccess: () => {
          toast({
            title: "Note deleted",
            description: "Your note has been removed.",
          });
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.message || "Failed to delete note. Please try again.",
            variant: "destructive",
          });
        },
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Developer Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your internship progress and manage your learning notes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-skillmate-green rounded-lg flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Days Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <StickyNote className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Notes Created</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {notes.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">16.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Note Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Add Learning Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Day 1 - Setting up my coding environment"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={4}
                placeholder="Write your learning notes, thoughts, or progress here..."
                className="resize-none"
                {...register("content")}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-skillmate-green hover:bg-skillmate-dark-green"
              disabled={isCreating}
            >
              {isCreating ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Add Note
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Learning Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <StickyNote className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No notes yet. Add your first learning note above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {note.title}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      disabled={isDeleting}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 whitespace-pre-wrap">
                    {note.content}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(note.createdAt), "PPp")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
