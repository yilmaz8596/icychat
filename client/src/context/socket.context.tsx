import { createContext, useState, useEffect, useContext } from "react";
import { Socket, io } from "socket.io-client";
import { useStore } from "../store/useStore";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

export const socketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useStore();

  useEffect(() => {
    let newSocket: Socket | null = null;

    if (user) {
      newSocket = io("https://icychat.onrender.com", {
        query: { userId: user._id },
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.close();
        setSocket(null);
      }
    };
  }, [user]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
