import { useState } from "react";
import { Message as MessageProps } from "../../types";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

export default function Messages({
  messages,
  lastMessageRef,
}: {
  messages?: MessageProps[];
  lastMessageRef?: React.RefObject<HTMLDivElement>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages !== undefined &&
        messages.length > 0 &&
        messages?.map((message: MessageProps) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message?.message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages !== undefined && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
}
