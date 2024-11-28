import { useState } from "react";

interface ConversationProps {
  conversation: {
    _id: string;
    profilePic: string;
    fullName: string;
  };
  emoji: string;
  lastIdx: boolean;
}
export default function Conversation({
  conversation,
  emoji,
  lastIdx,
}: ConversationProps) {
  const [search, setSearch] = useState("");
  const [selectedConversation, setSelectedConversation] = useState({
    _id: "",
    profilePic: "",
    fullName: "",
  });
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
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
}
