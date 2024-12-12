import { Message as MessageProps } from "../../types";

interface MessagePropsExtended extends MessageProps {
  chatClassName?: string;
  bubbleBgColor?: string;
  shakeClass?: string;
  profilePic?: string;
  formattedTime?: string;
}

export default function Message({
  message,
  chatClassName,
  bubbleBgColor,
  shakeClass,
  profilePic,
  formattedTime,
}: MessagePropsExtended) {
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
}
