// import { P2, P3 } from "@/components/shared/headings/Headings";
import TickedMessage from "@/assets/icons/tick.svg";
import { MessageStatus, type IMessage } from "@/services/support/payload";
import dayjs from "dayjs";
import styles from "./ChatMain.module.scss";
import { P2, P3 } from "@/components/Headings/Headings";
import { convertGrpcDate } from "@/utils/helpers";

const SentChat: React.FC<{ chat: IMessage; showStatus: boolean }> = ({
  chat,
  showStatus
}) => {
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
    <div className={`${showStatus ? "mb-6" : "mb-1"} *:gap-2`}>
      <div className={styles.container2}>
        <div
          className={`${styles.header2} ${
            showStatus ? "rounded-br-none" : "rounded-br-lg"
          }`}
        >
          <P2>{chat.Message}</P2>
        </div>
        <div className="flex h-8 w-10 items-center justify-center">
          {chat.Status === MessageStatus.Read && showStatus && (
            <TickedMessage />
          )}
        </div>
      </div>
      {showStatus && (
        <div className={styles.bottom}>
          <P3>
            You <span>•</span> {lastChatTime}
          </P3>
        </div>
      )}
    </div>
  );
};

export default SentChat;
