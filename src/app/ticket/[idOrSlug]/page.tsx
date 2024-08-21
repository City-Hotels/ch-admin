"use client";

import ChatLayout from "@/components/ChatLayout/Chat";
import UserChat from "@/components/Ticket/user-chat";
import { WebSocketProvider } from "@/context/WebSocketContext";
import { useState } from "react";

const ChatPage = () => {
  const [chat, setChat] = useState<"ticket" | "support">("support");

  return (
    <WebSocketProvider>
      <ChatLayout active={chat} setActive={setChat}>
        <UserChat showConversation />
      </ChatLayout>
    </WebSocketProvider>
  );
};

export default ChatPage;
