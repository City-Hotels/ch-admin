"use client";

import ChatLayout from "@/components/ChatLayout/Chat";
import { useState } from "react";
import { WebSocketProvider } from "@/context/WebSocketContext";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserChat from "@/components/Ticket/user-chat";

const ChatPage = () => {
  const [chat, setChat] = useState<"ticket" | "support">("ticket");

  return (
    <WebSocketProvider>
      <ChatLayout active={chat} setActive={setChat}>
        <UserChat />
      </ChatLayout>
    </WebSocketProvider>
  );
};

export default ChatPage;
