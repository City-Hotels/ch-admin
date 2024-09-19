import TypeIcon from "@/assets/icons/chat-type.svg";
import Button from "@/components/Button/Button";
import TextArea from "@/components/Inputs/textarea/TextArea";
// import Button from "@/components/shared/button/Button";
// import TextArea from "@/components/shared/inputs/textarea/TextArea";
import { useWebSocket } from "@/context/WebSocketContext";
import { sendChatMessage } from "@/services/support";
import type { IConversation, IMessage } from "@/services/support/payload";
import { getUser } from "@/services/user";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { SetStateAction, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

function dateToTimestamp(date: Date): { seconds: number; nanos: number } {
  // Ensure the input is a valid Date object
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }
  // Get the timestamp in milliseconds
  const millis = date.getTime();
  // Convert milliseconds to seconds (integer part)
  const seconds = Math.floor(millis / 1000);
  // Calculate the nanoseconds (remaining milliseconds converted to nanoseconds)
  const nanos = (millis % 1000) * 1e6;
  return { seconds, nanos };
}

const TypeChat: React.FC<{
  conversation: IConversation;
  setIsTyping: (isTyping: boolean) => void;
  onSend_receive_message: React.Dispatch<SetStateAction<IMessage[]>>;
  // message: string;
  // setMessage: React.Dispatch<SetStateAction<string>>;
  isTyping: boolean;
}> = ({
  conversation: { Id, User },
  setIsTyping,
  isTyping,
  onSend_receive_message
  // message,
  // setMessage
}) => {
  const [message, setMessage] = useState("");
  const socket = useWebSocket();
  const curUser = useSelector(selectCurrentUser); //getCurrent()

  const stableDate = useMemo(() => dateToTimestamp(new Date(Date.now())), []);

  const sendChat = useCallback(() => {
    const latestMessage = {
      Id: "",
      ConversationId: Id,
      Message: message,
      Type: "",
      Sender: {
        Id: curUser.Id || "",
        Firstname: curUser.Firstname,
        Lastname: curUser.Lastname,
        Imageurl: curUser.ImageUrl,
        Role: "ADMIN"
      },

      Recipient: {
        Id: User.Id,
        Firstname: User.Firstname,
        Lastname: User.Lastname,
        Imageurl: User.Imageurl,
        Role: "USER"
      },
      Status: 0,
      CreatedAt: stableDate,
      UpdatedAt: stableDate,
      TicketEntry: {}
    } as IMessage;

    if (socket && message) {
      onSend_receive_message((prevMsgs) => [...prevMsgs, latestMessage]);
      setMessage("");
    }
    return () => {};
  }, [Id, socket, message, curUser, stableDate, User, onSend_receive_message]);

  return (
    <div className="relative flex items-end gap-2 bg-white dark:bg-slate-800 px-2">
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
