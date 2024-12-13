import { useSocketContext } from "../context/socket.context";
import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { Message } from "../types";
import notificationSound from "../assets/notification.mp3";
export const useListenMessages = () => {
  const { socket } = useSocketContext()!;

  const { addMessage } = useStore();

  useEffect(() => {
    socket?.on("newMessage", (message: Message) => {
      message.shouldShake = true;
      const audio = new Audio(notificationSound);
      audio.play();
      addMessage(message);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, addMessage]);
};
