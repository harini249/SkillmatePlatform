import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Note, InsertNote } from "@shared/schema";

export function useNotes() {
  const queryClient = useQueryClient();

  const { data: notes = [], isLoading, refetch } = useQuery<Note[]>({
    queryKey: ["/api/notes"],
  });

  const createNoteMutation = useMutation({
    mutationFn: (note: Omit<InsertNote, "userId">) => 
      apiRequest("POST", "/api/notes", note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest("DELETE", `/api/notes/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
    },
  });

  return {
    notes,
    isLoading,
    createNote: createNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
    refetch,
  };
}
