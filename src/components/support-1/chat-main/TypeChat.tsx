import TypeIcon from "@/assets/icons/chat-type.svg";
import Button from "@/components/Button/Button";
import TextArea from "@/components/Inputs/textarea/TextArea";
// import Button from "@/components/shared/button/Button";
// import TextArea from "@/components/shared/inputs/textarea/TextArea";
import { useWebSocket } from "@/context/WebSocketContext";
import { sendChatMessage } from "@/services/support";
import type { IConversation } from "@/services/support/payload";
import { useCallback, useState } from "react";

const TypeChat: React.FC<{
  conversation: IConversation;
  setIsTyping: (isTyping: boolean) => void;
  isTyping: boolean;
}> = ({ conversation: { Id, Recipient }, setIsTyping, isTyping }) => {
  const [message, setMessage] = useState("");
  const socket = useWebSocket();

  const sendChat = useCallback(() => {
    if (socket && message) {
      sendChatMessage(socket, message, Id, Recipient.Id);
      setMessage("");
    }
    return () => {};
  }, [Id, socket, message, Recipient?.Id]);

  return (
    <div className="relative flex items-end gap-2 bg-white px-2">
      <div className="left-2 mb-2">
        <TypeIcon />
      </div>

      <TextArea
        name={""}
        placeholder="Type Message"
        className="w-full rounded-md"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        rows={isTyping ? 3 : 1}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />

      {message.length > 0 && (
        <Button
          className="right-3 mb-4"
          color="text"
          variant="text"
          onClick={sendChat}
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default TypeChat;
