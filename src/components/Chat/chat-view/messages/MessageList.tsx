import React from "react";
import Message from "./Message";
import { isImageLink, wrapURLsInAnchorTag } from "./Syntax";

interface Message {
  type: string;
  message: string;
  username: string;
  avatar: string;
  timestamp: string;
}

interface MessageListProps {
  messages: any[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onAvatarClick: (username: string) => void;
  handleMessageRightClick: (event: React.MouseEvent, message: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  messagesEndRef,
  onAvatarClick,
  handleMessageRightClick,
}) => {
  return (
    <div className="max-h-64 overflow-x-auto overflow-y-auto rounded-xl p-4 text-gray-300">
      {messages.map((message, index) => {
        if (!message.message) {
          console.error(`Invalid message: ${JSON.stringify(message)}`);
          return null;
        }
        const user = message.username;
        const text = message.message;
        const formattedText = wrapURLsInAnchorTag(text);
        const imageFlag = isImageLink(text);

        if (message.type === "join" || message.type === "leave") {
          return (
            <div key={index} className="italic text-gray-400">
              {text}
            </div>
          );
        }

        return (
          <Message
            key={index}
            user={user}
            text={text}
            isImage={imageFlag}
            formattedText={formattedText}
            avatar={message.avatar}
            timestamp={message.timestamp}
            onAvatarClick={onAvatarClick}
            onMessageRightClick={(event) =>
              handleMessageRightClick(event, message.message)
            }
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
