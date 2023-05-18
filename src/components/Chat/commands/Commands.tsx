// src/components/Chat/commands/Commands.tsx
import React from "react";
import { Message } from "../types";
import people from "../../../../test_data/people.json";
const parseCommand = (
  command: string,
  setShowCommands: (value: boolean) => void,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setUsername: (value: { name: string; avatar?: string }) => void
): boolean => {
  const commandParts = command.split(" ");
  const mainCommand = commandParts[0].toLowerCase();

  const regex = /^[a-zA-Z0-9]*$/;
  switch (mainCommand) {
    case "/help":
      setShowCommands(true);
      return true;
    case "/clear":
      if (
        commandParts.length === 2 &&
        commandParts[1].toLowerCase() === "all"
      ) {
        setMessages([]);
        return true;
      } else if (commandParts.length === 3) {
        const subCommand = commandParts[1].toLowerCase();
        const numMessages = parseInt(commandParts[2]);
        if (subCommand === "old" && !isNaN(numMessages)) {
          setMessages((prevMessages) => prevMessages.slice(numMessages));
          return true;
        } else if (subCommand === "new" && !isNaN(numMessages)) {
          setMessages((prevMessages) =>
            prevMessages.slice(0, prevMessages.length - numMessages)
          );
          return true;
        }
      }
      return false;

    case "/nick":
      if (commandParts.length === 2 && regex.test(commandParts[1])) {
        const newUsername = commandParts[1].slice(0, 30);
        const foundPerson = people.find(
          (person: { name: string }) =>
            person.name.toLowerCase() === newUsername.toLowerCase()
        );

        setUsername((prevUsername: any) => ({
          ...prevUsername,
          name: newUsername,
          avatar: foundPerson ? foundPerson.avatarURL : prevUsername.avatar,
        }));
      }
      return true;

    case "/avatar":
      if (commandParts.length === 2) {
        const avatarURL = commandParts[1];
        setUsername((prevUsername: any) => ({
          ...prevUsername,
          avatar: avatarURL,
        }));
      }
      return true;

    default:
      return false;
  }
};

export default parseCommand;
