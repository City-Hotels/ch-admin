"use client";

import ChatLayout from "@/components/ChatLayout/Chat";
import { useState } from "react";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserChat from "@/components/Support/user-chat";

const ChatPage = () => {
  const [chat, setChat] = useState<"ticket" | "support">("ticket");

  return (
    <ChatLayout active={chat} setActive={setChat}>
      <UserChat />
    </ChatLayout>
  );
};

export default ChatPage;
