import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { useToast } from "./use-toast";

export function useRealtime() {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    // Create WebSocket connection
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      
      // Authenticate the WebSocket connection
      ws.send(JSON.stringify({
        type: 'auth',
        userId: user.id
      }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        switch (message.type) {
          case 'note_created':
            // Invalidate notes query to refetch data
            queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
            
            // Show toast notification if it's from another user
            if (message.data.userId !== user.id) {
              toast({
                title: "New note added",
                description: `${message.data.title} was added by another user`,
              });
            }
            break;
            
          case 'note_deleted':
            // Invalidate notes query to refetch data
            queryClient.invalidateQueries({ queryKey: ["/api/notes"] });
            
            // Show toast notification if it's from another user
            if (message.data.userId !== user.id) {
              toast({
                title: "Note deleted",
                description: "A note was deleted by another user",
              });
            }
            break;
            
          default:
            console.log("Unknown message type:", message.type);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [user, queryClient, toast]);

  return {
    isConnected,
    ws: wsRef.current,
  };
}