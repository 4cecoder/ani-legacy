// src/components/Chat/commands/CommandMenu.tsx
import React from "react";
import Draggable from "react-draggable";

interface CommandMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const CommandMenu: React.FC<CommandMenuProps> = ({ isVisible, onClose }) => {
  const commands = [
    { name: "/help", usage: "Show the list of available commands" },
    { name: "/clear all", usage: "Clear all messages" },
    {
      name: "/clear old [number]",
      usage: "Clear the specified number of oldest messages",
    },
    {
      name: "/clear new [number]",
      usage: "Clear the specified number of newest messages",
    },
    {
      name: "/nick [newUsername]",
      usage: "Change your nickname",
    },
    {
      name: "/avatar [img_url]",
      usage: "Set your avatar image (jpg, jpeg, png, gif, webp)",
    },
  ];

  if (!isVisible) return null;

  return (
    <div className="absolute top-32 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-20">
      <Draggable>
        <div className="w-11/12 rounded-3xl bg-gray-900  p-4 sm:w-3/4 md:w-1/2">
          <button onClick={onClose} className="float-right text-gray-500">
            Close
          </button>
          <h2 className="mb-4 text-xl font-bold text-gray-300">Commands</h2>
          <ul>
            {commands.map((command, index) => (
              <li key={index} className="mb-2">
                <code className="font-semibold text-purple-600">
                  {command.name}
                </code>
                <div className="text-gray-400">{command.usage}</div>
              </li>
            ))}
          </ul>
        </div>
      </Draggable>
    </div>
  );
};

export default CommandMenu;
