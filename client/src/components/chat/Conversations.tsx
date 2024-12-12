import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store/useStore";
import { useEffect } from "react";
import Conversation from "./Conversation";
import { getConversations } from "../../api/conversation";
import { ConversationResponse, UserProps } from "../../types";
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

  const { fetchUsers, users } = useStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  console.log(users);

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

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-200">No conversations yet 😢</p>;
  }

  return (
    <div>
      {users?.map((user, idx) => (
        <Conversation
          key={user._id}
          user={user as UserProps}
          emoji={getRandomEmoji()}
          lastIdx={idx === users.length - 1}
        />
      ))}
    </div>
  );
}
