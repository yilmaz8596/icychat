import { useQuery } from "@tanstack/react-query";
import Conversation from "./Conversation";
import { getConversations } from "../../api/conversation";
import { ConversationResponse } from "../../types";

export default function Conversations() {
  const {
    data: conversations,
    isLoading,
    error,
  } = useQuery<ConversationResponse[]>({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        conversations?.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji="👋"
            lastIdx={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
}
