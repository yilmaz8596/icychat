import { useState } from "react";
import { Message as MessageProps, Participant } from "../../types";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import { useStore } from "../../store/useStore";
import { Message as MyMessage } from "../../types";

interface MessagesProps {
  messages?: MyMessage[];
  profilePic: string;
}

// Messages.tsx - Update your Messages component with the interface
export default function Messages({ messages, profilePic }: MessagesProps) {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, user, conversations } = useStore();
  // const messages = selectedConversation?.messages;

  // Create a map of user IDs to profile pictures

  console.log(selectedConversation);
  console.log(messages);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages?.map((message: MessageProps) => (
          <div key={message._id}>
            <Message
              message={message.message}
              senderProfilePic={
                message.senderId === user?._id
                  ? user?.profilePic || getDefaultAvatar(user?._id || "")
                  : conversations?.find(
                      (conversation) =>
                        conversation.otherParticipant._id === message.senderId
                    )?.otherParticipant.profilePic ||
                    getDefaultAvatar(message.senderId)
              }
              senderId={message.senderId}
              receiverId={message.receiverId}
            />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && (!messages || messages.length === 0) && (
        <p className="text-center text-gray-400 text-lg mt-4 font-semibold">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
}

// Helper function to generate default avatars
const getDefaultAvatar = (userId: string): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
};
