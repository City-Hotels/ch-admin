"use client";

import ChatLayout from "@/components/ChatLayout/Chat";
import UserChat from "@/components/support-1/user-chat";
import { useState } from "react";
import { WebSocketProvider } from "@/context/WebSocketContext";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const ChatPage = () => {
  const [chat, setChat] = useState<"chat" | "support">("chat");

  return (
    <WebSocketProvider>
      <ChatLayout active={chat} setActive={setChat}>
        <UserChat />
      </ChatLayout>
    </WebSocketProvider>
  );
};

export default ChatPage;
