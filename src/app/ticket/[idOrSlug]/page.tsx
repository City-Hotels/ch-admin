"use client";

import ChatLayout from "@/components/ChatLayout/Chat";
import UserChat from "@/components/Ticket/user-chat";
import { useState } from "react";

const ChatPage = () => {
  const [chat, setChat] = useState<"ticket" | "support">("support");

  return (
    <ChatLayout active={chat} setActive={setChat}>
      <UserChat showConversation />
    </ChatLayout>
  );
};

export default ChatPage;
