import { useSocketContext } from "../../context/socket.context";
import { useStore } from "../../store/useStore";
import { ConversationResponse, UserProps } from "../../types";
import { createConversation } from "../../api/conversation";

interface ConversationProps {
  conversation?: ConversationResponse;
  user: UserProps;
  emoji: string;
  lastIdx: boolean;
}

export default function Conversation({
  conversation,
  user,
  emoji,
  lastIdx,
}: ConversationProps) {
  const {
    setSelectedConversation: setClickedConversation,
    conversations,
    selectedConversation,
  } = useStore();

  const handleCreateConversation = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!user._id) {
      console.error("No user ID");
      return;
    }

    try {
      const newConversation = await createConversation(user._id);
      if (
        newConversation &&
        !conversations?.find((c) => c._id === newConversation._id)
      ) {
        setClickedConversation(newConversation);
      } else {
        return;
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const { onlineUsers } = useSocketContext()!;
  const isOnline = onlineUsers.includes(user._id);

  console.log(isOnline);

  return (
    <div
      className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
       `}
      onClick={handleCreateConversation}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img
            src={
              user?.profilePic ||
              "https://www.gravatar.com/avatar/" + user?.email + "?d=identicon"
            }
            alt="user avatar"
          />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">{user?.fullName}</p>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </div>
  );
}
