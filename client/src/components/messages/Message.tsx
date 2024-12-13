import { Message as MessageProps } from "../../types";
import { useStore } from "../../store/useStore";
import { useState, useEffect } from "react";

interface MessagePropsExtended extends MessageProps {
  senderProfilePic: string;
  receiverProfilePic: string;
}

export default function Message({
  message,
  senderId,
  senderProfilePic,
  receiverProfilePic,
  createdAt,
  shouldShake,
}: MessagePropsExtended) {
  const { user } = useStore();
  const isCurrentUser = senderId === user?._id;

  const [isShaking, setIsShaking] = useState(shouldShake);

  // Reset shake after animation
  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, 500); // Match this with your animation duration

      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const img = e.target as HTMLImageElement;
    img.src = getDefaultAvatar(senderId, user?.gender || "");
  };

  const shakeClass = shouldShake ? "shake" : "";

  return (
    <div
      className={`flex w-full mb-4 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isCurrentUser && (
        <div className="chat-image avatar flex-shrink-0 mt-auto mb-2 mr-2">
          <div className="w-10 h-10 overflow-hidden rounded-full p-1 bg-gray-300">
            <img
              alt="User avatar"
              src={receiverProfilePic}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div
        className={`relative flex flex-col gap-1 max-w-[75%] mx-2 chat ${
          isCurrentUser ? "chat-end" : "chat-start"
        }`}
      >
        <div
          className={`relative chat-bubble min-w-fit ${
            isCurrentUser ? "bg-blue-500" : "bg-gray-500"
          } ${isShaking ? "shake" : ""}`}
        >
          <p className="text-white">{message}</p>
          <div
            className={`text-xs text-gray-200 opacity-70 mt-1 ${
              isCurrentUser ? "text-right" : "text-left"
            }`}
          ></div>
        </div>
        <div className="text-gray-200">
          {createdAt &&
            new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div>
      </div>

      {isCurrentUser && (
        <div className="chat-image avatar flex-shrink-0 mt-auto mb-2 ml-2">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              alt="User avatar"
              src={senderProfilePic}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const getDefaultAvatar = (userId: string, gender: string): string => {
  if (gender === "male") {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&backgroundColor=b6e3f4&radius=50&hair=short01,short02,short03,short04,short05&accessoriesChance=25`;
  } else if (gender === "female") {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&backgroundColor=ffdfeb&radius=50&hair=long01,long02,long03,long04,long05&accessoriesChance=50`;
  }

  // Default fallback
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&radius=50`;
};
