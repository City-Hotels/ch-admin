import { useState } from "react";

import UserChat from "@/components/shared/chat/user-chat";
import ChatLayout from "@/layout/chat/Chat";

const ChatPage = () => {
  const [chat, setChat] = useState<"chat" | "support">("chat");

  return (
    <ChatLayout active={chat} setActive={setChat}>
      <UserChat showConversation />
    </ChatLayout>
  );
};

export default ChatPage;
