import { useState } from "react";
import { useStore } from "../../store/useStore";
import { useQuery } from "@tanstack/react-query";
import { IoSearchSharp } from "react-icons/io5";
import { User, ConversationResponse, Participant } from "../../types";
import { getConversations, createConversation } from "../../api/conversation";
import toast from "react-hot-toast";

export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useStore();

  const { data: conversations } = useQuery<ConversationResponse[]>({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;

    if (search.length < 3) {
      toast.error("Search query must be at least 3 characters long");
      return;
    }

    if (!conversations) return;

    conversations.forEach(async (conversation) => {
      if (
        conversation.otherParticipant.fullName
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        setSelectedConversation(conversation);
      }

      const newConversation = await createConversation(
        conversation.otherParticipant._id
      );
      setSelectedConversation(newConversation);
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}
