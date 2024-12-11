import { create } from "zustand";

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

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  conversation: null,
  setConversation: (conversation) => set({ conversation }),
}));
