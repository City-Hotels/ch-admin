import React, {
  useState,
  useRef,
  useMemo,
  SetStateAction,
  useCallback,
  useEffect
} from "react";
// import Group from "@/assets/icons/groups.svg";
import AddImage from "@/assets/icons/add-image-icon.svg";
import Send from "@/assets/icons/send-message-icon.svg";
import CancelIcon from "@/assets/icons/image-x-icon.svg";
import { H5, P, P3 } from "@/components/Headings/Headings";
import Img from "@/components/Image/Image";
import styles from "./ChatMain.module.scss";
import { useWebSocket } from "@/context/WebSocketContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { IConversation, IMessage } from "@/services/support/payload";
import { sendChatMessage } from "@/services/support";

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

const TypeChat = ({
  isTyping,
  setIsTyping,
  conversation: { Id, User },
  onSend_receive_message
}: {
  isTyping: boolean;
  setIsTyping: (s: boolean) => void;
  conversation: IConversation;
  onSend_receive_message: React.Dispatch<SetStateAction<IMessage[]>>;
}) => {
  const [images, setImages] = useState<File[]>([]);
  const textAreaRef = useRef<HTMLParagraphElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [placeHolder, setPlaceHolder] = useState<string>("Type Message...");
  const socket = useWebSocket();
  const curUser = useSelector(selectCurrentUser); //getCurrent()

  const temporaryImageUrls = images.map((img) => URL.createObjectURL(img));
  const stableDate = useMemo(() => dateToTimestamp(new Date(Date.now())), []);
  const paragraph = useRef<HTMLParagraphElement | null>(null);

  const handleSubmit = useCallback(() => {
    if (
      textAreaRef.current?.firstChild?.textContent?.trim() === "" &&
      temporaryImageUrls.length < 1
    )
      return;

    const messageStr = textAreaRef?.current?.firstChild?.textContent
      ? textAreaRef.current.firstChild.textContent
      : "";

    const latestMessage = {
      Id: "",
      ConversationId: Id,
      Message: messageStr,
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

    if (socket && messageStr) {
      console.log({ latestMessage });
      sendChatMessage(socket, messageStr, Id, User.Id);
      onSend_receive_message((prevMsgs) => [...prevMsgs, latestMessage]);
    }

    temporaryImageUrls.forEach((img) => URL.revokeObjectURL(img));

    if (textAreaRef.current?.firstChild)
      textAreaRef.current.firstChild.textContent = "";
    setImages([]);
    setPlaceHolder("Type Message...");
    setIsTyping(false);
  }, [
    Id,
    User,
    onSend_receive_message,
    temporaryImageUrls,
    curUser,
    stableDate,
    socket,
    setIsTyping
  ]);

  return (
    <div className="relative flex flex-row gap-2 bg-white px-2">
      <div className="relative w-[8%]">
        <span
          className="cursor-pointer absolute bottom-2 -translate-x-[50%] left-[50%]"
          onClick={() => fileInputRef.current?.click()}
        >
          <AddImage />
        </span>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (!isTyping) {
            setIsTyping(true);
            setPlaceHolder("");
          }

          if (e.target.files === null) return;

          const imgFiles = Array.from(e.target.files);

          setImages((s) =>
            s.length !== 4 && s.length + imgFiles.length <= 4
              ? [...s, ...imgFiles]
              : s
          );
        }}
        className="hidden"
        multiple
        ref={fileInputRef}
      />

      <div
        className={`${styles.hideScrollBar} relative min-h-[52px] h-[100px] overflow-y-auto w-full rounded-md border p-2 px-6`}
        ref={textAreaRef}
      >
        <P
          ref={paragraph}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="outline-none"
          onFocus={(e) => {
            e.currentTarget.style.opacity = "1";
            setPlaceHolder("");
            setIsTyping(true);
          }}
          onBlur={(e) => {
            if (e.currentTarget?.textContent === "") {
              e.currentTarget.style.opacity = "0.7";
              setPlaceHolder("Type Message...");
              setIsTyping(false);
            }
          }}
        >
          {placeHolder}
        </P>

        <div className="grid grid-cols-4 gap-2 mt-3">
          {temporaryImageUrls.map((imageSrc, i) => (
            <div key={i} className="relative">
              <Img
                path={imageSrc}
                name={imageSrc}
                alt="Uploaded preview"
                className="h-[80px] w-full rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setImages((s) => s.filter((_, index) => index !== i))
                }
                className="absolute top-0 right-0 rounded-full bg-white p-1 shadow-md"
              >
                <CancelIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute bottom-2 right-3"
        onClick={() => !placeHolder && handleSubmit()}
      >
        <Send />
      </button>
    </div>
  );
};

export default TypeChat;
