import { useEffect, useState, useRef } from "react";
import { useListenMessages } from "../../hooks/useListenMessages";
import { Message as MessageProps } from "../../types";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import { useStore } from "../../store/useStore";
import { Message as MyMessage } from "../../types";

interface MessagesProps {
  messages?: MyMessage[];
  profilePic: string;
}

export default function Messages({ messages, profilePic }: MessagesProps) {
  const [loading, setLoading] = useState(false);
  const { user, users, selectedConversation } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useListenMessages();

  console.log(selectedConversation);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages?.map((message: MessageProps) => {
          const receiverId = message.receiverId;
          const receiver = users?.find((u) => u._id === receiverId);

          return (
            <div key={message._id}>
              <Message
                message={message.message}
                senderProfilePic={user?.profilePic as string}
                receiverProfilePic={receiver?.profilePic ?? ""}
                senderId={message.senderId}
                receiverId={message.receiverId}
                createdAt={message.createdAt}
                shouldShake={message.shouldShake}
              />
            </div>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && (!messages || messages.length === 0) && (
        <p className="text-center text-gray-400 text-lg mt-4 font-semibold">
          Send a message to start the conversation
        </p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
