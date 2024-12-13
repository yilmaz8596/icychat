import { useQuery } from "@tanstack/react-query";
import Conversation from "./Conversation";
import { getAllUsers } from "../../api/user";
import { UserProps } from "../../types";
import { getRandomEmoji } from "../../utils/emojis";

export default function Conversations() {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
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

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-200">No conversations yet 😢</p>;
  }

  return (
    <div>
      {users?.map((user: UserProps, idx: number) => (
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
