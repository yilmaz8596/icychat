import { ConversationResponse } from "../types";

export const getConversations = async (): Promise<ConversationResponse[]> => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_API_URL}/api/conversation`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!resp.ok) {
      throw new Error("Failed to fetch conversations");
    }

    return await resp.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred");
  }
};
