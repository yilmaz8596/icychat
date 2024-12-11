import { create } from "zustand";

interface StoreState {
  user: {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    gender: string;
  } | null;
  setUser: (user: StoreState["user"] | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
