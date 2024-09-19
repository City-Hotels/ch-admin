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
}> = ({
  conversation,
  isTyping,
  sent_received_messages,
  onSend_receive_message
}) => {
  const user = useSelector(selectCurrentUser);
  const [isFetchingMsgs, setIsFetchingMsgs] = useState(true);
  const [pageNum, setPageNum] = useState(0);
  const socket = useWebSocket();
  const [isFetching, setIsFetching] = useState(false);
  const meta = useRef<Meta | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef.current]);

  const noPreviousMessages = useMemo(
    () =>
      !!sent_received_messages &&
      sent_received_messages.length < 1 &&
      pageNum === 0,
    [sent_received_messages, pageNum]
  );

  useEffect(() => {
    if (!socket || !conversation?.Id) return () => {};
    getConversationMessages(socket, conversation.Id);
    if (noPreviousMessages) setIsFetchingMsgs(true);

    return () => {};
  }, [conversation?.Id, socket, noPreviousMessages]);

  useEffect(() => {
    if (!socket || !conversation?.Id) return;

    const handler = (event: MessageEvent<any>) => {
      const msg = JSON.parse(event.data) as {
        Data: IMessage | { Messages: IMessage[]; Meta: Meta };
        Type: string;
      };
      if (msg.Type === "CONVERSATION_MESSAGES") {
        setIsFetchingMsgs(false);
        const Data = msg.Data as { Messages: IMessage[]; Meta: Meta };

        if (Data.Messages && pageNum === 0) {
          onSend_receive_message((s) => {
            return Data.Messages.map((newData) => {
              const existingUIEl = s.find(
                (el) =>
                  el.Id === "" && el.CreatedAt.nanos === newData.CreatedAt.nanos
              );
              if (existingUIEl) return existingUIEl;
              else return newData;
            });
          });
          scrollToBottom();
        } else {
          chatContainerRef.current?.scrollTo({
            top: 70
          });
          setIsFetching(false);

          onSend_receive_message((s) => [...s, ...Data.Messages]);
        }

        meta.current = Data.Meta;
        setTimeout(() => setPageNum(Data.Meta.CurrentPage), 1000);
      } else if (msg.Type === "INCOMING_MESSAGE") {
        getUserConversations(socket);
        const data = msg.Data as IMessage;
        if (data.ConversationId === conversation?.Id) {
          // getConversationMessages(socket, conversation.Id); // Removed this line so that image can uplaod successfully
          onSend_receive_message((msgs) =>
            msgs.map((msg) =>
              msg.CreatedAt.nanos === data.CreatedAt.nanos
                ? { ...msg, Id: data.Id }
                : msg
            )
          );
          scrollToBottom();
        }
      }

      return event;
    };
    socket.addEventListener("message", handler);

    return () => {
      socket?.removeEventListener("message", handler);
    };
  }, [
    socket,
    onSend_receive_message,
    conversation?.Id,
    scrollToBottom,
    pageNum
  ]);

  const ref = useRef<null | HTMLSpanElement>(null);

  useEffect(() => {
    const spanEl = ref.current;

    if (!spanEl || !socket) return;

    function handler(entries: IntersectionObserverEntry[]) {
      const [entry] = entries;

      if (
        entry.isIntersecting &&
        socket &&
        conversation?.Id &&
        pageNum !== 0 &&
        meta.current
      ) {
        setIsFetching(true);
        getConversationMessages(
          socket,
          conversation.Id,
          meta.current?.CurrentPage + 1
        );
      }
    }

    const observer = new IntersectionObserver(handler, {
      root: null,
      threshold: 0.1
    });

    observer.observe(spanEl);

    return () => {
      observer.unobserve(spanEl);
    };
  }, [
    conversation?.Id,
    socket,
    pageNum,
    sent_received_messages.length,
    isFetching
  ]);

  return (
    <div
      className={`flex ${
        isTyping
          ? "h-[calc(100vh-300px)]"
          : `h-[calc(100vh-250px)] md:h-[calc(100vh-300px)]`
      } flex-col overflow-y-auto px-5 py-3 ${styles.scrollBars}`}
      ref={chatContainerRef}
    >
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        sent_received_messages.length > 0 &&
        pageNum !== 0 &&
        meta.current?.CurrentPage !== meta.current?.TotalPages && (
          <span className="h-20 text-black inline-block" ref={ref}>
            hiiiiiiiiiii
          </span>
        )
      )}
      {sent_received_messages
        .slice()
        .sort((a, b) => a.CreatedAt.seconds - b.CreatedAt.seconds)
        .map((chat, index) =>
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
