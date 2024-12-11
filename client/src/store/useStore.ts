import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  } | null;

  setUser: (user: StoreState["user"] | null) => void;
  setConversation: (conversation: StoreState["conversation"] | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      conversation: null,
      setConversation: (conversation) => set({ conversation }),
    }),
    {
      name: "chat-storage", // unique name for localStorage key
    }
  )
);
