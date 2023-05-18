// src/components/Chat/chat-view/messages/Message.tsx
import React from "react";

interface MessageProps {
  user: string;
  text: string;
  isImage: boolean;
  formattedText: string;
  avatar: string | undefined;
  timestamp: string;
  onAvatarClick: (username: string) => void;
  onMessageRightClick: (event: React.MouseEvent, message: string) => void;
}

const Message: React.FC<MessageProps> = ({
  user,
  text,
  isImage,
  formattedText,
  avatar,
  timestamp,
  onAvatarClick,
  onMessageRightClick,
}) => {
  const formattedTimestamp = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mb-4 flex items-start text-sm">
      <img
        onClick={() => onAvatarClick(user)}
        src={avatar || "./default-avatar.png"}
        alt="Avatar"
        className="mr-3 h-10 w-10 rounded"
      />
      <div className="flex-1 overflow-hidden">
        <div>
          <span className="font-bold">{user}</span>
          <span className="text-grey ml-2 text-xs">{formattedTimestamp}</span>
        </div>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: formattedText }}
          onContextMenu={(event) => onMessageRightClick(event, text)}
        ></div>
      </div>
    </div>
  );
};

export default Message;
