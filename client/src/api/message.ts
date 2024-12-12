import { Message } from "../types";

export const createMessage = async (message: Message, receiverId: string) => {
  // Validate receiverId
  if (!receiverId) {
    throw new Error("Receiver ID is required");
  }

  try {
    const resp = await fetch(
      `${import.meta.env.VITE_API_URL}/api/message/send/${receiverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
        credentials: "include",
      }
    );

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${resp.status}`
      );
    }

    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error in createMessage:", error);
    throw error;
  }
};
