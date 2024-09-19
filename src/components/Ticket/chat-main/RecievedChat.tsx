import { MessageStatus, type IMessage } from "@/services/support/payload";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useWebSocket } from "@/context/WebSocketContext";
import {
  getConversationMessages,
  updateConversationStatus
} from "@/services/support";
import styles from "./ChatMain.module.scss";
import Avatar from "@/components/Avatar/Avatar";
import { P2, P3 } from "@/components/Headings/Headings";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { convertGrpcDate } from "@/utils/helpers";
// import Avatar from "../../../user/avatar/Avatar";

const RecievedChat: React.FC<{ chat: IMessage; showStatus: boolean }> = ({
  chat,
  showStatus
}) => {
  const socket = useWebSocket();
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 0.1, // Adjust the threshold as needed
    freezeOnceVisible: true // Optional: freeze observer once component is visible
  });

  useEffect(() => {
    if (isIntersecting && chat.Status === MessageStatus.Unread && socket) {
      updateConversationStatus(socket, chat.ConversationId);
      const timeout = setTimeout(
        () => {}, //getConversationMessages(socket, chat.ConversationId),
        10000
      );

      return () => {
        clearTimeout(timeout);
      };
    }
    return () => {};
  }, [isIntersecting, chat, socket]);

  const date = convertGrpcDate(chat.CreatedAt);

  let lastChatTime = "";
  if (
    dayjs(date).diff(new Date(), "day") === 0 &&
    dayjs(date).day() === new Date().getDay()
  ) {
    lastChatTime = dayjs(date).format("hh:mm A");
  } else if (
    dayjs(new Date()).diff(date, "day") === 0 &&
    dayjs(new Date()).diff(date, "hours") < 24
  ) {
    lastChatTime = `Yesterday ${dayjs(date).format("hh:mm A")}`;
  } else if (dayjs(date).diff(new Date(), "day") > -6) {
    lastChatTime = dayjs(date).format("dddd");
  } else lastChatTime = dayjs(date).format("DD MMM hh:mm A");

  return (
    <div className={styles.container} ref={ref}>
      <Avatar
        Imageurl={chat.Sender.Imageurl}
        Firstname={chat.Sender.Firstname}
        Lastname={chat.Sender.Lastname}
        className={styles.img || ""}
      />
      <div>
        <div className={styles.header}>
          <P2>{chat.Message}</P2>
        </div>
        {showStatus && (
          <div>
            <P3 className="mt-1 pl-3 text-grey700">
              {chat.Sender.Firstname} {chat.Sender.Lastname} • {lastChatTime}
            </P3>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecievedChat;
