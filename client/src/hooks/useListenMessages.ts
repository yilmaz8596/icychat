import { useSocketContext } from "../context/socket.context";
import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { Message } from "../types";
export const useListenMessages = () => {
  const { socket } = useSocketContext()!;

  const { addMessage } = useStore();

  useEffect(() => {
    socket?.on("newMessage", (message: Message) => {
      addMessage(message);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, addMessage]);
};
