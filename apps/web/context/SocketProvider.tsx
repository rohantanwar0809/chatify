"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => void;
  messages: string[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (message) => {
      console.log("sendMessage", message);
      if (socket) socket.emit("message", { message });
    },
    [socket]
  );

  const onMessageReceived = useCallback((msgRes: { message: string }) => {
    console.log("From Server msg received", msgRes);
    const { message: msg } = msgRes;
    setMessages((prev) => [...prev, msg]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageReceived);
    if (_socket) {
      setSocket(_socket);
    }
    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageReceived);
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
