"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WebSocketContextType {
  ws: WebSocket | null;
  isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketServerUrl = process.env.NODE_ENV === "development" ? 'ws://localhost:8080' : "wss://clanchatworker-production.up.railway.app"

  useEffect(() => {
    const connectSocket = () => {
      const socket = new WebSocket(socketServerUrl);

      socket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        setTimeout(connectSocket, 5000);
      };

      socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        setIsConnected(false);
      };

      setWs(socket);

      return () => {
        socket.close();
      };
    };

    connectSocket();

    return () => {
      ws?.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
