"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";

export default function Page() {
  const { sendMessage, messages: allMessages } = useSocket();
  const [messages, setMessages] = useState<string>("");
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          Welcome to Chatify!
        </h1>
        <p className="text-md text-gray-600 font-medium my-2  px-32">
          <b>Chatify</b> leverages Turbo Repo in its monorepo setup, creating a
          cohesive development environment for building and deploying a
          distributed real-time chat application. With Turbo Repo, the project
          benefits from unified code management, shared components, and
          centralized configuration, enhancing collaboration and
          maintainability.
        </p>
        <p className="text-md text-gray-600 font-medium my-2  px-32">
          The combination of a distributed architecture and Turbo Repo ensures
          that Chatify is not only scalable and robust but also efficiently
          managed and organized for collaborative development.
        </p>
        <div className="grid w-full gap-2 px-16">
          <ul className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md h-96 overflow-y-auto">
            {allMessages.map((message, idx) => (
              <li
                key={`${message}-${idx}`}
                className="bg-gray-100 p-2 rounded-md"
              >
                {message}
              </li>
            ))}
          </ul>
          <Textarea
            onChange={(e) => {
              setMessages(e.target.value);
            }}
            placeholder="Type your message here."
          />
          <Button
            onClick={() => sendMessage(messages)}
            disabled={messages.length <= 0}
          >
            Send message
          </Button>
        </div>
      </div>
    </>
  );
}
