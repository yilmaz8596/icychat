import { useState } from "react";
import { Message as MessageProps } from "../../types";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

export default function Messages({
  messages,
  lastMessageRef,
  profilePic,
}: {
  messages?: MessageProps[];
  lastMessageRef?: React.RefObject<HTMLDivElement>;
  profilePic: string;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages !== undefined &&
        messages.length > 0 &&
        messages?.map((message: MessageProps) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message
              message={message?.message}
              senderId={message?.senderId}
              receiverId={message?.receiverId}
              createdAt={message?.createdAt}
              updatedAt={message?.updatedAt}
              _id={message?._id}
              profilePic={profilePic}
              bubbleBgColor={
                message?.senderId === message?.receiverId
                  ? "bg-gray-500"
                  : "bg-blue-500"
              }
              chatClassName={
                message?.senderId === message?.receiverId
                  ? "justify-end"
                  : "justify-start"
              }
            />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages !== undefined && messages.length === 0 && (
        <p
          className="
          text-center
          text-gray-400
          text-lg
          mt-4
          font-semibold
        "
        >
          No messages yet
        </p>
      )}
    </div>
  );
}
