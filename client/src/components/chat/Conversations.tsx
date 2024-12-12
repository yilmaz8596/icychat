import { useQuery } from "@tanstack/react-query";
import Conversation from "./Conversation";
import { getConversations } from "../../api/conversation";
import { ConversationResponse } from "../../types";
import { getRandomEmoji } from "../../utils/emojis";

export default function Conversations() {
  const {
    data: conversations,
    isLoading,
    error,
  } = useQuery<ConversationResponse[]>({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  if (isLoading)
    return (
      <div className="mx-auto">
        <span className="loading loading-spinner"></span>
      </div>
    );

  if (error)
    return (
      <p className="text-red-500">
        {error.message || "An unexpected error occurred"}
      </p>
    );

  if (!conversations || conversations.length === 0) {
    return <p className="text-center text-gray-200">No conversations yet 😢</p>;
  }

  return (
    <div>
      {conversations?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
}
