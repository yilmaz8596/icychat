import { useState } from "react";
import { useStore } from "../../store/useStore";
import { BsSend } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { createMessage } from "../../api/message";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { user, selectedConversation, fetchConversations, addMessage } =
    useStore();

  const handleEmojiClick = (emojiObject: any) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const receiverId = selectedConversation?.participants.find(
      (id) => id !== user?._id
    );

    if (!receiverId) {
      toast.error("No recipient selected");
      return;
    }

    if (!message.trim()) {
      return;
    }

    setLoading(true);

    try {
      const messageData = {
        senderId: user?._id!,
        receiverId: receiverId,
        message: message.trim(),
      };

      const newMessage = await createMessage(messageData, receiverId);

      if (!newMessage) {
        throw new Error("Failed to send message");
      }

      addMessage(newMessage);
      setMessage("");
      await fetchConversations();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const receiverId = selectedConversation?.participants.find(
    (id) => id !== user?._id
  );

  const canSendMessage =
    Boolean(receiverId) && !loading && message.trim() !== "";

  return (
    <form className="px-4 my-3" onSubmit={handleFormSubmit}>
      <div className="w-full relative">
        <div className="relative flex items-center">
          <button
            type="button"
            className="absolute left-2 text-gray-400 hover:text-gray-200"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <BsEmojiSmile size={20} />
          </button>
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 pl-10 bg-gray-700 border-gray-600 text-white"
            placeholder={
              receiverId
                ? "Send a message"
                : "Select a conversation to send message"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="absolute right-0 flex items-center pe-3 hover:bg-gray-600 px-4 rounded-r-lg h-full"
            disabled={!canSendMessage}
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BsSend
                className={`${
                  !canSendMessage
                    ? "text-gray-500"
                    : "text-white hover:text-blue-300"
                }`}
              />
            )}
          </button>
        </div>

        {/* Emoji Picker Popup */}
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
            />
          </div>
        )}
      </div>
    </form>
  );
}
