import type { IConversation, IMessage } from "@/services/support/payload";
import { useEffect, useMemo, useState } from "react";
import { getUserConversations } from "@/services/support";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { useParams, useSearchParams } from "next/navigation";
import type { IUser } from "@/services/user/payload";
import { useWebSocket } from "@/context/WebSocketContext";
import { getChatConversations } from "@/store/slice/support/chat.slice";
import { useRouter } from "next/navigation";
import ChatRecipient from "../chat-main/ChatRecipient";
import TypeChat from "../chat-main/TypeChat";
import ChatHistory from "../chat-history/ChatHistory";
import ChatMain from "../chat-main/ChatMain";
import SupportBookingSummary from "../support-booking-summary/SupportBookingSummary";
import styles from "./index.module.scss";
import Information from "../Information";
import CreateTicket from "../CreateTicket";
import ReAssignModal from "../ReAssignModal";
import { P } from "@/components/Headings/Headings";
import Popup from "../Popup";
import ChevronDown from "@/assets/icons/chevron-down.svg";

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
// Example usage:
// const date = new Date();
// const timestamp = dateToTimestamp(date);
// console.log("Seconds:", timestamp.seconds);
// console.log("Nanoseconds:", timestamp.nanos);

const UserChat: React.FC<{ showConversation?: boolean }> = ({
  showConversation
}) => {
  const [conversation, setConversation] = useState<IConversation>();

  const chatConversations = useSelector(getChatConversations);
  const conversations = useMemo(
    () => chatConversations || [],
    [chatConversations]
  );

  const selectedUser = useSelector(selectCurrentUser) || {};
  const user = useMemo(() => selectedUser || {}, [selectedUser]);

  // const conversations = useSelector(getChatConversations) || [];
  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  // const { slug } = router.query;

  // console.log({ conversations });

  const socket = useWebSocket();
  // const user = useSelector(selectCurrentUser) || {};
  const [isTyping, setIsTyping] = useState(false);
  const search = useSearchParams();
  const [createTicketOpen, setCreateTicketOpen] = useState(false);

  // const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  // useEffect(() => {
  //   if (!socket) return;
  //   getUserConversations(socket);

  //   const handler = (event: MessageEvent<any>) => {
  //     const msg = JSON.parse(event.data);
  //     if (msg.Type === "INCOMING_MESSAGE") {
  //       const data = msg.Data as IMessage;
  //       if (
  //         conversation?.Id === "" &&
  //         ((data.Recipient.Id === conversation.SupportAgent.Id &&
  //           data.Sender.Id === user.Id) ||
  //           (data.Recipient.Id === user.Id &&
  //             data.Sender.Id === conversation.SupportAgent.Id))
  //       ) {
  //         setConversation({ ...conversation, Id: data.ConversationId });
  //       }
  //     }
  //     return event;
  //   };

  //   socket.addEventListener("message", handler);

  //   return () => {
  //     socket.removeEventListener("message", handler);
  //   };
  // }, [socket, conversation, user.Id, conversations?.length]);

  useEffect(() => {
    const base64String = search.get("h");
    if (!base64String) return;
    const decodedString = Buffer.from(base64String, "base64").toString("utf-8");
    const json = JSON.parse(decodedString) as IUser;
    const existingConvo = conversations.find(
      (conv) => conv.SupportAgent.Id === json.Id || conv.User.Id === json.Id
    );

    const convo: IConversation = {
      User: {
        Id: json.Id || "",
        Firstname: json.Firstname,
        Lastname: json.Lastname,
        Imageurl: json.ImageUrl
      },
      SupportAgent: {
        Id: user.Id || "",
        Firstname: user.Firstname,
        Lastname: user.Lastname,
        Imageurl: user.ImageUrl
      },
      Id: "",
      Ticket: "",
      Status: 0,
      Feedback: "",
      UnReadCount: 0
    };

    if (existingConvo) setConversation(existingConvo);
    // if (!conversation && conversations.length > 0) setConversation(conversations[0]);
    else setConversation(convo);
  }, [search, user, conversations]);

  useEffect(() => {
    if (!socket) {
      return () => {};
    }
    if (socket && conversations?.length < 1) getUserConversations(socket);

    const handler = (event: MessageEvent<any>) => {
      const msg = JSON.parse(event.data);
      if (msg.Type === "INCOMING_MESSAGE") {
        const data = msg.Data as IMessage;
        // console.log({ testttt: data });
        if (
          conversation?.Id === "" &&
          ((data.Recipient.Id === conversation.SupportAgent.Id &&
            data.Sender.Id === user.Id) ||
            (data.Recipient.Id === user.Id &&
              data.Sender.Id === conversation.SupportAgent.Id))
        ) {
          setConversation({ ...conversation, Id: data.ConversationId });
          getUserConversations(socket);
        }
      }
      return event;
    };

    //   {
    //     "testttt": {
    //         "Id": "66cdd6560c03049723c7004a",
    //         "ConversationId": "66cc7f98f31745b6616357c2",
    //         "Message": "hllo lekan",
    //         "Type": "",
    //         "Sender": {
    //             "Id": "474109c4-41dc-4a35-a7e9-bd6504fdc84c",
    //             "Firstname": "Femi",
    //             "Lastname": "Majek",
    //             "Imageurl": "",
    //             "Role": "ADMIN"
    //         },
    //         "Recipient": {
    //             "Id": "dc4e41ef-4ff1-4e5e-94f2-55086c40ecbf",
    //             "Firstname": "Adiro",
    //             "Lastname": "Olalekan",
    //             "Imageurl": "https://image.cityhotelsandbookings.com/users/dc4e41ef-4ff1-4e5e-94f2-55086c40ecbf/profile/head.jpg",
    //             "Role": "USER"
    //         },
    //         "Status": 0,
    //         "CreatedAt": {
    //             "seconds": 1724765782,
    //             "nanos": 918616243
    //         },
    //         "UpdatedAt": {
    //             "seconds": 1724765782,
    //             "nanos": 918617877
    //         },
    //         "TicketEntry": {}
    //     }
    // }

    socket.addEventListener("message", handler);

    return () => {
      socket.removeEventListener("message", handler);
      // if (list) socket?.removeEventListener("message", list);
    };
  }, [socket, conversation, user.Id, conversations?.length]);

  // useEffect(() => {
  //   if (!conversation && conversations.length > 0)
  //     setConversation(conversations[0]);

  //   return () => {};
  // }, [conversations, conversation]);

  useEffect(() => {
    if (conversations && idOrSlug?.toString()) {
      const convo = conversations.find(
        (item) => item.Id === idOrSlug?.toString()
      );
      setConversation(convo);
    }

    return () => {};
  }, [conversations, idOrSlug]);

  // console.log({ conversation, socket });
  console.log(messages);
  console.log("plllllllll");
  return (
    <>
      <div className="h-full rounded-md border border-[#ddd] lg:min-w-[90vw]">
        <div className="relative flex h-full flex-col">
          <div className="flex size-full">
            <div
              className={`${
                showConversation ? "hidden lg:block" : "lg:block"
              } w-full overflow-y-auto overflow-x-hidden border-r md:w-[350px]  ${
                styles.scrollBars
              }`}
            >
              <ChatHistory
                onClickConversation={setConversation}
                conversations={conversations || []}
                activeConversation={conversation?.Id || ""}
              />
            </div>
            <div
              className={`${
                showConversation
                  ? "flex-col lg:flex"
                  : "hidden flex-col lg:flex"
              }  size-full flex-col lg:flex lg:w-[calc(100%-350px)]`}
            >
              <div className="flex w-full flex-row items-center justify-between border-b px-3 py-1 shadow-sm">
                <ChatRecipient conversation={conversation} />
                {idOrSlug && (
                  <>
                    <Popup>
                      <span className="relative block  w-[7rem]">
                        <Popup.Window
                          name="ticket-status"
                          className="top-[100%] left-[80%]"
                        >
                          <Popup.Btn>New</Popup.Btn>
                          <Popup.Btn>On-hold</Popup.Btn>
                          <Popup.Btn>Resolved</Popup.Btn>
                        </Popup.Window>
                        <Popup.Open opens="ticket-status">
                          <button className="bg-white size-full px-3 py-1 border border-white500 text-start rounded-md flex justify-between items-center">
                            New
                            <ChevronDown />
                          </button>
                        </Popup.Open>
                        {/* <select className="border border-white400 p-2 rounded-md outline-none">
                      <option>New</option>
                    </select> */}
                      </span>
                    </Popup>
                    <P
                      role="button"
                      className="text-orange-400"
                      onClick={() => setCreateTicketOpen((s) => !s)}
                    >
                      Create ticket
                    </P>
                  </>
                )}
              </div>
              <div className="grid grid-cols-1  gap-3 md:grid-cols-[2fr_1fr]">
                <div className="relative w-full border-r">
                  <ChatMain
                    conversation={conversation}
                    isTyping={isTyping}
                    onSend_receive_message={setMessages}
                    sent_received_messages={messages}
                  />
                  {conversation && (
                    <div className="w-full bg-white">
                      <TypeChat
                        conversation={conversation}
                        setIsTyping={setIsTyping}
                        isTyping={isTyping}
                        onSend_receive_message={setMessages}

                        // message={message}
                        // setMessage={setMessage}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`hidden w-full flex-col gap-5 overflow-y-auto xl:flex ${styles.scrollBars} py-5 md:h-[calc(100vh-197px)]`}
                >
                  {/* <SupportBookingSummary /> */}
                  {conversation && (
                    <Information>
                      <Information.User userId={conversation?.User?.Id} />
                      {/* <Information.Ticket /> */}
                    </Information>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReAssignModal />
        {createTicketOpen && (
          <CreateTicket
            conversationId={conversation?.Id || ""}
            isOpen={createTicketOpen}
            setIsOpen={setCreateTicketOpen}
          />
        )}
      </div>
    </>
  );
};

export default UserChat;
