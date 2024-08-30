import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
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
import ChatMain2 from "./TypeChat-2";

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
  onSend_receive_message: React.Dispatch<SetStateAction<IMessage[]>>;
  sent_received_messages: IMessage[];
  isFocused: boolean;
}> = ({
  conversation,
  isTyping,
  sent_received_messages,
  onSend_receive_message,
  isFocused
}) => {
  const user = useSelector(selectCurrentUser);
  // const [messages, setMessages] = useState<IMessage[]>([]);
  const [isFetchingMsgs, setIsFetchingMsgs] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const socket = useWebSocket();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef.current]);

  const noPreviousMessages = useMemo(
    () => sent_received_messages.length < 1 && pageNum === 1,
    [sent_received_messages, pageNum]
  );

  useEffect(() => {
    // console.log("runs", 1, socket);
    if (!socket || !conversation?.Id) return () => {};
    getConversationMessages(socket, conversation.Id);
    if (noPreviousMessages) setIsFetchingMsgs(true);

    return () => {};
  }, [conversation?.Id, socket, noPreviousMessages]);

  // useEffect(() => {
  //   // setMessages([]);
  //   onSend_receive_message([]);

  //   return () => {};
  // }, [conversation?.Id]);

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
          // console.log(Data.Messages, 123);
          if (Data.Meta.CurrentPage !== pageNum) {
            // setMessages((Data.Messages as IMessage[]) || []);
            onSend_receive_message((s) => [
              ...(Data.Messages as IMessage[]),
              ...s
            ]);
            setPageNum(Data.Meta.PageNumber);
          }

          setPageNum(Data.Meta.CurrentPage);
          setTimeout(scrollToBottom, 100);
        } else if (msg.Type === "INCOMING_MESSAGE") {
          getUserConversations(socket);
          const data = msg.Data as IMessage;
          if (data.ConversationId === conversation?.Id) {
            getConversationMessages(socket, conversation.Id);
            // setMessages([...messages, data]);
            onSend_receive_message((msgs) => [...msgs, data]);
            setTimeout(scrollToBottom, 100);
          }
        }

        return event;
      });
    }

    return () => {
      socket?.removeEventListener("message", list);
    };
  }, [socket, onSend_receive_message, conversation, scrollToBottom, pageNum]);

  return (
    <div
      className={`flex ${
        isTyping
          ? "h-[calc(100vh-300px)]"
          : `h-[calc(100vh-250px)] md:h-[calc(100vh-300px)]`
      } flex-col overflow-y-auto px-5 py-3 ${styles.scrollBars}`}
      ref={chatContainerRef}
    >
      {sent_received_messages.map((chat, index) =>
        chat.Sender.Id === user.Id ? (
          <div className="ml-auto" key={chat.Id}>
            <SentChat
              chat={chat}
              showStatus={
                !sent_received_messages[index + 1] ||
                sent_received_messages[index + 1]?.Sender?.Id !== user.Id ||
                (sent_received_messages[index + 1]?.Sender?.Id === user.Id &&
                  sent_received_messages[index + 1]?.Status !==
                    MessageStatus.Read &&
                  chat.Status === MessageStatus.Read)
              }
            />
          </div>
        ) : (
          <div key={chat.Id}>
            <RecievedChat
              chat={chat}
              showStatus={
                sent_received_messages[index + 1]?.Recipient?.Id !== user.Id
              }
            />
          </div>
        )
      )}
      {isFetchingMsgs && conversation?.Id && <SkeletonLoader />}
    </div>
  );
};

export default ChatMain;
