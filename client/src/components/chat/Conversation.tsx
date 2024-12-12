import { useState } from "react";
import { useStore } from "../../store/useStore";
import {
  ConversationResponse,
  SelectedConversation,
  Message,
} from "../../types";

interface ConversationProps {
  conversation: ConversationResponse;
  emoji: string;
  lastIdx: boolean;
}

export default function Conversation({
  conversation,
  emoji,
  lastIdx,
}: ConversationProps) {
  const [search, setSearch] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<SelectedConversation>({
      _id: "",
      profilePic: "",
      fullName: "",
      messages: [],
    });
  const [isOnline, setIsOnline] = useState(false);

  const { user, setSelectedConversation: setClickedConversation } = useStore();
  const otherParticipant = conversation.participants.find(
    (participant) => participant._id !== user?._id
  );

  const isSelected = selectedConversation._id === conversation._id;

  if (!otherParticipant) return null; // Add a guard clause

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  console.log(selectedConversation);

  return (
    <div
      className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}`}
      onClick={() => {
        setSelectedConversation({
          _id: conversation._id,
          profilePic: otherParticipant.profilePic,
          fullName: otherParticipant.fullName,
          messages: conversation.messages as Message[],
        });
        setClickedConversation(selectedConversation);
      }}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12 rounded-full">
          <img src={otherParticipant.profilePic} alt="user avatar" />
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold text-gray-200">{otherParticipant.fullName}</p>
          <span className="text-xl">{emoji}</span>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </div>
  );
}
