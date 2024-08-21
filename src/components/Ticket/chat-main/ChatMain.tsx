import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MessageStatus,
  type IConversation,
  type IMessage
} from "@/services/support/payload";
import {
  getConversationMessages,
  getUserConversations
} from "@/services/support";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { useWebSocket } from "@/context/WebSocketContext";
import RecievedChat from "./RecievedChat";
import SentChat from "./SentChat";
import SkeletonSentChat from "./Skeleton/SkeletonSentChat";
import SkeletonRecievedChat from "./Skeleton/SkeletonRecievedChat";
import styles from "./ChatMain.module.scss";
import { Meta } from "@/utils/api/calls";

const SkeletonLoader = () => (
  <>
    <div className="ml-auto">
      <SkeletonSentChat />
    </div>
    <div>
      <SkeletonRecievedChat />
    </div>
    <div>
      <SkeletonRecievedChat />
    </div>
    <div className="ml-auto">
      <SkeletonSentChat />
    </div>
  </>
);

const ChatMain: React.FC<{
  conversation?: IConversation;
  isTyping?: boolean;
}> = ({ conversation, isTyping }) => {
  const user = useSelector(selectCurrentUser);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isFetchingMsgs, setIsFetchingMsgs] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const socket = useWebSocket();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef.current]);

  useEffect(() => {
    console.log("runs", 1, socket);
    if (!socket || !conversation?.Id) return () => {};
    getConversationMessages(socket, conversation.Id);
    console.log("runs", 2, socket);
    if (messages.length < 1 && pageNum === 1) setIsFetchingMsgs(true);

    return () => {};
  }, [conversation?.Id, socket, messages, pageNum]);

  useEffect(() => {
    setMessages([]);

    return () => {};
  }, [conversation?.Id]);

  useEffect(() => {
    let list: any;
    if (socket) {
      list = socket.addEventListener("message", (event: MessageEvent<any>) => {
        const msg = JSON.parse(event.data) as {
          Data: IMessage | { Messages: IMessage[]; Meta: Meta };
          Type: string;
        };
        if (msg.Type === "CONVERSATION_MESSAGES") {
          setIsFetchingMsgs(false);
          const Data = msg.Data as { Messages: IMessage[]; Meta: Meta };
          setMessages((Data.Messages as IMessage[]) || []);
          setPageNum(Data.Meta.CurrentPage);
          setTimeout(scrollToBottom, 100);
        } else if (msg.Type === "INCOMING_MESSAGE") {
          getUserConversations(socket);
          const data = msg.Data as IMessage;
          if (data.ConversationId === conversation?.Id) {
            getConversationMessages(socket, conversation.Id);
            setMessages([...messages, data]);
            setTimeout(scrollToBottom, 100);
          }
        }
      });
    }
    return () => {
      socket?.removeEventListener("message", list);
    };
  }, [socket, messages, conversation, scrollToBottom]);

  return (
    <div
      className={`flex ${
        isTyping
          ? "h-[calc(100vh-300px)]"
          : "h-[calc(100vh-250px)] md:h-[calc(100vh-260px)]"
      } flex-col overflow-y-auto px-5 py-3 ${styles.scrollBars}`}
      ref={chatContainerRef}
    >
      {messages.map((chat, index) =>
        chat.Sender.Id === user.Id ? (
          <div className="ml-auto" key={chat.Id}>
            <SentChat
              chat={chat}
              showStatus={
                !messages[index + 1] ||
                messages[index + 1]?.Sender?.Id !== user.Id ||
                (messages[index + 1]?.Sender?.Id === user.Id &&
                  messages[index + 1]?.Status !== MessageStatus.Read &&
                  chat.Status === MessageStatus.Read)
              }
            />
          </div>
        ) : (
          <div key={chat.Id}>
            <RecievedChat
              chat={chat}
              showStatus={messages[index + 1]?.Recipient?.Id !== user.Id}
            />
          </div>
        )
      )}
      {isFetchingMsgs && conversation?.Id && <SkeletonLoader />}
    </div>
  );
};

export default ChatMain;
