import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Message } from "../types";

interface StoreState {
  user: {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    gender: string;
  } | null;

  conversation: {
    _id: string;
    participants: {
      _id: string;
      fullName: string;
      username: string;
      email: string;
      gender: string;
    }[];
    messages: {
      _id: string;
      sender: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    }[];
    createdAt: string;
    updatedAt: string;
    otherParticipant: {
      _id: string;
      fullName: string;
      username: string;
      email: string;
      gender: string;
      profilePic: string;
    };
  } | null;

  selectedConversation: {
    _id: string;
    profilePic: string;
    fullName: string;
    messages: Message[];
  } | null;

  setUser: (user: StoreState["user"] | null) => void;
  setConversation: (conversation: StoreState["conversation"] | null) => void;
  setSelectedConversation: (
    conversation: StoreState["selectedConversation"] | null
  ) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      conversation: null,
      selectedConversation: null,
      setConversation: (conversation) => set({ conversation: conversation }),
      setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation: selectedConversation }),
    }),

    {
      name: "chat-storage", // unique name for localStorage key
    }
  )
);
