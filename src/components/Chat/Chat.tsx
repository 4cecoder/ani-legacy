// Chat.tsx
import React, { useEffect, useRef, useState } from "react";
import UsernameInput from "./chat-view/UsernameInput";
import MessageList from "./chat-view/messages/MessageList";
import InputForm from "./chat-view/InputForm";
import parseCommand from "./commands/Commands";
import CommandMenu from "./commands/CommandMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faSync } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProfileCard from "../ProfileCard";
import Draggable from "react-draggable";

interface ChatProps {}

const CustomContextMenu: React.FC<{
  isVisible: boolean;
  position: { x: number; y: number };
  message: string;
  onHide: () => void;
}> = ({ isVisible, position, message, onHide }) => {
  const copyMessage = () => {
    navigator.clipboard
      .writeText(message)
      .catch((error) => console.error("Error copying text:", error));
  };
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000); // 3000ms delay
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      className={`absolute z-10 rounded-md bg-white py-1 text-black shadow-md ${
        isVisible ? "block" : "hidden"
      }`}
      style={{ left: position.x, top: position.y }}
    >
      <button onClick={copyMessage} className="px-4 py-1 text-sm">
        Copy Message
      </button>
    </div>
  );
};

const Chat: React.FC<ChatProps> = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [username, setUsername] = useState<{
    name: string;
    avatar?: string;
  }>({
    name: "",
  });

  const [isChatVisible, setIsChatVisible] = useState<boolean>(true);
  const [wasChatCollapsed, setWasChatCollapsed] = useState<boolean>(false);

  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  const [showCommands, setShowCommands] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [notificationAudio] = useState(new Audio());
  const [joinChatAudio] = useState(new Audio());
  const [leaveChatAudio] = useState(new Audio());

  const [showProfileCard, setShowProfileCard] = useState<boolean>(false);
  const [clickedProfile, setClickedProfile] = useState<any>(null);
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [selectedMessage, setSelectedMessage] = useState<string>("");

  // Add this function to store only the last 50 messages
  const updateMessages = (newMessage: any) => {
    setMessages((prevMessages) => {
      if (prevMessages.length >= 50) {
        return [...prevMessages.slice(1), newMessage];
      } else {
        return [...prevMessages, newMessage];
      }
    });
  };
  const handleMessageRightClick = (
    event: React.MouseEvent,
    message: string
  ) => {
    event.preventDefault();
    setSelectedMessage(message);
    setShowContextMenu(true);
    setContextMenuPosition({ x: event.clientX, y: event.clientY });
  };
  const filterJoinMessages = (messages: any[]) => {
    return messages.filter(
      (message) => message.message !== "A new user has joined the chat."
    );
  };

  const handleAvatarClick = async (username: string) => {
    try {
      const response = await axios.get(
        `https://pipebomb.bytecats.codes/profiles/api/users/${username}`
      );
      setClickedProfile(response.data.profile);
      setShowProfileCard(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const clearJoinMessagesPeriodically = () => {
    setInterval(() => {
      setMessages((prevMessages) => {
        const filteredMessages = filterJoinMessages(prevMessages);
        return filteredMessages;
      });
    }, 60 * 1000); // 60 seconds
  };

  // Load audio files in useEffect
  useEffect(() => {
    notificationAudio.src = "./notification.mp3";
    notificationAudio.load();
    joinChatAudio.src = "./join_chat.mp3";
    joinChatAudio.load();
    leaveChatAudio.src = "./leave_chat.mp3";
    leaveChatAudio.load();
  }, []);

  const toggleChatVisibility = () => {
    setIsChatVisible(!isChatVisible);
    if (!isChatVisible) {
      setUnreadMessages(0);
      setWasChatCollapsed(true);
    }
  };
  const isValidURL = (url: string | URL) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Create playSound function using switch case
  const playSound = (soundType: string) => {
    switch (soundType) {
      case "notification":
        notificationAudio.volume = 0.1;
        notificationAudio.currentTime = 0;
        notificationAudio
          .play()
          .catch((error) => console.error("Error playing sound:", error));
        break;
      case "join_chat":
        joinChatAudio.volume = 0.1;
        joinChatAudio.currentTime = 0;
        joinChatAudio
          .play()
          .catch((error) => console.error("Error playing sound:", error));
        break;
      case "leave_chat":
        leaveChatAudio.volume = 0.3;
        leaveChatAudio.currentTime = 0;
        leaveChatAudio
          .play()
          .catch((error) => console.error("Error playing sound:", error));
        break;
      default:
        console.error("Invalid sound type:", soundType);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      if (wasChatCollapsed) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        setWasChatCollapsed(false);
      } else if (
        messages.length > 0 &&
        messages[messages.length - 1].username !== username.name
      ) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, wasChatCollapsed, username.name]);

  const reloadWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
    const ws = new WebSocket("wss://anij.bytecats.codes/ws/ws");
    ws.onopen = () => {
      console.log("Connected to websocket");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        const filteredMessages = filterJoinMessages(updatedMessages);
        return filteredMessages;
      });
    };

    ws.onclose = () => {
      console.log("Disconnected from websocket");
    };

    setSocket(ws);
  };
  const clearDuplicatesPeriodically = () => {
    setInterval(() => {
      setMessages((prevMessages) => {
        const filteredMessages = filterDuplicateMessages(prevMessages);
        return filteredMessages;
      });
    }, 60 * 1000); // 60 seconds
  };
  useEffect(() => {
    if (username.name) {
      const ws = new WebSocket("wss://anij.bytecats.codes/ws/ws");
      ws.onopen = () => {
        console.log("Connected to websocket");
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        updateMessages(message);
        if (
          message.username !== "Space Mommy" &&
          message.username !== username.name
        ) {
          console.log("notification sound");

          playSound("notification");
        }
        if (!isChatVisible && message.username !== "Space Mommy") {
          setUnreadMessages((prev) => prev + 1);
        }
        if (
          message.username === "Space Mommy" &&
          message.message === "A new user has joined the chat."
        ) {
          playSound("join_chat");
        }
        if (
          message.username === "Space Mommy" &&
          message.message === "A user has left the chat."
        ) {
          playSound("leave_chat");
        }
      };

      ws.onclose = () => {
        console.log("Disconnected from websocket");
      };

      setSocket(ws);
      clearJoinMessagesPeriodically();
      clearDuplicatesPeriodically();
    }
  }, [username]);

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    if (inputValue.length > 500) {
      setWarningMessage("Message exceeds 500 character limit.");
      return;
    }
    if (inputValue.trim().startsWith("/")) {
      const isCommand = parseCommand(
        inputValue.trim(),
        setShowCommands,
        setMessages,
        setUsername
      );
      if (isCommand) {
        setInputValue("");
        return;
      } else {
        setWarningMessage(
          "Invalid command. Type /help for a list of commands."
        );
        return;
      }
    }

    const currentTime = Date.now();
    if (currentTime - lastMessageTimestamp < 3000) {
      // set warning message
      setWarningMessage("Please wait 3 seconds between messages.");
      return;
    }

    if (socket) {
      socket.send(
        JSON.stringify({
          username: username.name,
          avatar: username.avatar,
          message: inputValue,
          timestamp: new Date().toISOString(),
        })
      );
    }

    setInputValue("");
    setLastMessageTimestamp(currentTime);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const disableContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("contextmenu", disableContextMenu);
    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  const handleChange = (e: any) => {
    if (e.target.value.length <= 500) {
      setInputValue(e.target.value);
      setWarningMessage("");
    } else {
      setWarningMessage("Message exceeds 500 character limit.");
    }
  };
  const filterDuplicateMessages = (messages: any[]) => {
    const filteredMessages = messages.reduce(
      (accumulator: any[], message: any) => {
        const isDuplicate = accumulator.some(
          (msg) =>
            msg.timestamp === message.timestamp &&
            msg.username === message.username &&
            msg.message === message.message
        );
        if (!isDuplicate) {
          accumulator.push(message);
        }
        return accumulator;
      },
      []
    );

    // Return only the latest 50 messages
    return filteredMessages.slice(-50);
  };

  const handleUsernameSubmit = (e: any, preloadedAvatar: string | null) => {
    if (e.key === "Enter") {
      const enteredUsername = (e.target as HTMLInputElement).value.trim();
      const avatarURL =
        preloadedAvatar && isValidURL(preloadedAvatar)
          ? preloadedAvatar
          : undefined;
      setUsername({
        name: enteredUsername,
        avatar: avatarURL,
      });
    }
  };

  const closeCommands = () => {
    setShowCommands(false);
  };

  if (!username.name) {
    return <UsernameInput handleUsernameSubmit={handleUsernameSubmit} />;
  }

  return (
    <Draggable handle=".drag-handle" bounds="body">
      <div>
        <CustomContextMenu
          isVisible={showContextMenu}
          position={contextMenuPosition}
          message={selectedMessage}
          onHide={() => setShowContextMenu(false)}
        />
        {isChatVisible ? (
          <div className="relative h-full w-full min-w-max rounded-lg bg-gray-900 bg-opacity-60 p-4 shadow-xl">
            <div className="drag-handle absolute top-0 right-0 h-8 w-8 cursor-move rounded-bl-lg bg-pink-500"></div>
            <button
              onClick={reloadWebSocket}
              className="absolute top-2 left-2 text-white hover:animate-spin focus:outline-none"
            >
              <FontAwesomeIcon icon={faSync} fontSize={20} />
            </button>
            <CommandMenu isVisible={showCommands} onClose={closeCommands} />
            <div className="text-white opacity-90">
              {showProfileCard && clickedProfile && (
                <ProfileCard
                  profile={clickedProfile}
                  onClose={() => setShowProfileCard(false)}
                />
              )}
              <MessageList
                messages={messages}
                messagesEndRef={messagesEndRef}
                onAvatarClick={handleAvatarClick}
                handleMessageRightClick={handleMessageRightClick}
              />
            </div>
            <InputForm
              inputValue={inputValue}
              handleChange={handleChange}
              handleKeyDown={handleKeyDown}
              warningMessage={warningMessage}
            />
          </div>
        ) : null}
        <div className="fixed bottom-4 right-4">
          <button
            onClick={toggleChatVisibility}
            className="relative text-white focus:outline-none"
          >
            <FontAwesomeIcon icon={faComment} size="2x" />
            {unreadMessages > 0 ? (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadMessages}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default Chat;
