import { Message as MessageProps } from "../../types";
import { useStore } from "../../store/useStore";

interface MessagePropsExtended extends MessageProps {
  senderProfilePic: string;
}

export default function Message({
  message,
  senderId,
  senderProfilePic,
  createdAt,
}: MessagePropsExtended) {
  const { user } = useStore();
  const isCurrentUser = senderId === user?._id;

  return (
    <div className={`chat ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={senderProfilePic}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${
          isCurrentUser ? "bg-blue-500" : "bg-gray-500"
        } pb-2`}
      >
        {message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {createdAt &&
          new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
      </div>
    </div>
  );
}
