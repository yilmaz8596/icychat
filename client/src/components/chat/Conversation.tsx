import { useState } from "react";
import { ConversationResponse } from "../../types";

interface ConversationProps {
  conversation: ConversationResponse;
  emoji: string;
  lastIdx: boolean;
}

interface SelectedConversation {
  _id: string;
  profilePic: string;
  fullName: string;
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
    });
  const [isSelected, setIsSelected] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  // Get the other participant's info
  const otherParticipant = conversation.participants[0];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-sky-500" : ""}
        `}
        onClick={() =>
          setSelectedConversation({
            _id: otherParticipant._id,
            profilePic: otherParticipant.profilePic,
            fullName: otherParticipant.fullName,
          })
        }
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={otherParticipant.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {otherParticipant.fullName}
            </p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
