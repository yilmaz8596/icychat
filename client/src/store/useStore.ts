import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getConversations } from "../api/conversation";
import { getAllUsers } from "../api/user";
import {
  ConversationResponse,
  Message,
  OtherParticipant,
  User,
} from "../types";

interface StoreState {
  user: {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    gender: string;
    profilePic?: string;
  } | null;

  selectedConversation: {
    _id: string;
    participants: string[];
    messages: Message[];
    createdAt?: string;
    updatedAt?: string;
    otherParticipant?: OtherParticipant;
  } | null;

  conversation: {
    _id: string;
    participants: {
      _id: string;
      fullName: string;
      username: string;
      email: string;
      gender: string;
      profilePic: string;
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

  conversations: ConversationResponse[] | null;
  users: User[] | null;

  setUser: (user: StoreState["user"] | null) => void;
  setConversation: (conversation: StoreState["conversation"] | null) => void;
  setSelectedConversation: (conversation: ConversationResponse | null) => void;
  addMessage: (newMessage: Message) => void;
  fetchConversations: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  setConversations: (conversations: StoreState["conversations"] | null) => void;
  setUsers: (users: StoreState["users"] | null) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      users: null,
      conversation: null,
      selectedConversation: null,
      conversations: null,

      // Actions
      setUser: (user) => set({ user }),

      setUsers: (users) => set({ users }),

      setConversation: (conversation) => set({ conversation }),

      setConversations: (conversations) => set({ conversations }),

      setSelectedConversation: (conversation) => {
        set({ selectedConversation: conversation });
      },

      addMessage: (newMessage) => {
        set((state): Partial<StoreState> => {
          if (!state.selectedConversation) {
            return {}; // Return empty object instead of undefined
          }

          return {
            selectedConversation: {
              ...state.selectedConversation,
              messages: [...state.selectedConversation.messages, newMessage],
            },
          };
        });
      },

      fetchConversations: async () => {
        try {
          const conversations = await getConversations();
          if (!conversations) {
            throw new Error("Failed to fetch conversations");
          }

          set({ conversations });
          console.log("Fetched conversations:", conversations);
        } catch (error) {
          console.error("Error fetching conversations:", error);
          set({ conversations: null, conversation: null });
        }
      },
      fetchUsers: async () => {
        try {
          const users = await getAllUsers();
          if (!users) {
            throw new Error("Failed to fetch users");
          }

          set({ users });
          console.log("Fetched users:", users);
        } catch (error) {
          console.error("Error fetching users:", error);
          set({ users: null });
        }
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
      // Optionally specify which parts of the state to persist
      partialize: (state) => ({
        user: state.user,
        selectedConversation: state.selectedConversation,
      }),
    }
  )
);
