import type {
  IConversation,
  IMessage,
  TicketEntry
} from "@/services/support/payload";
import { useEffect, useMemo, useState } from "react";
import {
  getTicketsList,
  getUserConversations,
  updateTicketStatus
} from "@/services/support";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { useParams, useSearchParams } from "next/navigation";
import type { IUser } from "@/services/user/payload";
import { useWebSocket } from "@/context/WebSocketContext";
import {
  getChatConversations,
  getTickets,
  setTickets
} from "@/store/slice/support/chat.slice";
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
import TicketSummary from "../TicketSummary";

const ticketStatus = [
  { name: "Pending", value: 0 },
  { name: "Resolved", value: 1 },
  { name: "Closed", value: 2 }
];

const UserChat: React.FC<{ showConversation?: boolean }> = ({
  showConversation
}) => {
  const [ticket, setTicket] = useState<TicketEntry>();
  // const conversations = useSelector(getChatConversations) || [];
  const tickets = useSelector(getTickets);
  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  // const { slug } = router.query;

  const socket = useWebSocket();
  const user = useSelector(selectCurrentUser) || {};
  // const [isTyping, setIsTyping] = useState(false);
  // const search = useSearchParams();
  const [reassignTicket, setReassignTicket] = useState(false);

  const stableSocket = useMemo(() => socket, [socket]);

  // useEffect(() => {
  //   const base64String = search.get("h");
  //   if (!base64String) return;
  //   const decodedString = Buffer.from(base64String, "base64").toString("utf-8");
  //   const json = JSON.parse(decodedString) as IUser;
  //   const existingConvo = conversations.find(
  //     (conv) => conv.SupportAgent.Id === json.Id || conv.User.Id === json.Id
  //   );

  //   const convo: IConversation = {
  //     User: {
  //       Id: json.Id || "",
  //       Firstname: json.Firstname,
  //       Lastname: json.Lastname,
  //       Imageurl: json.ImageUrl
  //     },
  //     SupportAgent: {
  //       Id: user.Id || "",
  //       Firstname: user.Firstname,
  //       Lastname: user.Lastname,
  //       Imageurl: user.ImageUrl
  //     },
  //     Id: "",
  //     Ticket: "",
  //     Status: 0,
  //     Feedback: "",
  //     UnReadCount: 0
  //   };

  //   if (existingConvo) setConversation(existingConvo);
  //   // if (!conversation && conversations.length > 0) setConversation(conversations[0]);
  //   else setConversation(convo);
  // }, [search, user, conversations]);

  console.log({ tickets });
  // const [status, setStatus] = useState<null | number>(null);
  const dispatch = useDispatch();

  console.log(status);

  useEffect(() => {
    if (!socket) {
      return () => {};
    }

    getTicketsList(socket);

    function handler(event: MessageEvent<any>) {
      const msg = JSON.parse(event.data);
      if (msg.Type === "TICKET_LIST") {
        const data = msg?.Data?.Tickets as TicketEntry[];
        console.log({ data_1: data });
        dispatch(setTickets(data));
        // setIsLoading((s) => !s);
        // if (
        //   conversation?.Id === "" &&
        //   ((data.Recipient.Id === conversation.SupportAgent.Id &&
        //     data.Sender.Id === user.Id) ||
        //     (data.Recipient.Id === user.Id &&
        //       data.Sender.Id === conversation.SupportAgent.Id))
        // ) {
        //   setConversation({ ...conversation, Id: data.ConversationId });
        //   getUserConversations(socket);
        // }
      }
      return event;
    }

    socket.addEventListener(
      "message",
      handler
      // (event: MessageEvent<any>) => {
      // const msg = JSON.parse(event.data);
      // if (msg.Type === "TICKET_LIST") {
      //   const data = msg?.Data?.Tickets as TicketEntry[];
      //   console.log({ data_1: data });
      //   dispatch(setTickets(data));
      //   // setIsLoading((s) => !s);
      //   // if (
      //   //   conversation?.Id === "" &&
      //   //   ((data.Recipient.Id === conversation.SupportAgent.Id &&
      //   //     data.Sender.Id === user.Id) ||
      //   //     (data.Recipient.Id === user.Id &&
      //   //       data.Sender.Id === conversation.SupportAgent.Id))
      //   // ) {
      //   //   setConversation({ ...conversation, Id: data.ConversationId });
      //   //   getUserConversations(socket);
      //   // }
      // }
      // return event;
      // }
    );

    return () => {
      socket.removeEventListener("message", handler);
      // if (list) socket?.removeEventListener("message", list);
    };
  }, [user.Id, tickets?.length, socket]);

  // useEffect(() => {
  //   if (!conversation && conversations.length > 0)

  //     setConversation(conversations[0]);

  //   return () => {};
  // }, [conversations, conversation]);

  useEffect(() => {
    if (idOrSlug?.toString()) {
      const openTicket = tickets?.find((item) => item.Id === String(idOrSlug));
      console.log({ openTicket });
      setTicket(openTicket);
    }

    return () => {};
  }, [tickets, tickets?.length, idOrSlug]);

  // console.log({
  //   tickets,
  //   socket,
  //   ticket,
  //   i: tickets?.find((item) => item.Id === idOrSlug?.toString())
  // });

  function handleUpdateStatus(status: number) {
    if (!socket || !idOrSlug) return;

    const data = {
      socket,
      status,
      ticketId: idOrSlug
    };

    console.log({ data });
    updateTicketStatus(data);
  }

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
                onClickConversation={setTicket}
                tickets={tickets || []}
                activeConversation={ticket?.Id || ""}
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
                <ChatRecipient ticket={ticket} />
                {idOrSlug && (
                  <>
                    <Popup>
                      <span className="relative block  w-[7rem]">
                        <Popup.Window
                          name="ticket-status"
                          className="top-[100%] left-[80%]"
                        >
                          {ticketStatus.map((status, i) => (
                            <Popup.Btn
                              key={i}
                              onClick={() => handleUpdateStatus(status.value)}
                            >
                              {status.name}
                            </Popup.Btn>
                          ))}
                          {/* <Popup.Btn>Pending</Popup.Btn>
                      <Popup.Btn>Resolved</Popup.Btn>
                      <Popup.Btn>Closed</Popup.Btn> */}
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
                      onClick={() => setReassignTicket((s) => !s)}
                    >
                      Reassign-ticket
                    </P>
                  </>
                )}
              </div>
              <div className="grid grid-cols-1  gap-3 md:grid-cols-[2fr_1fr]">
                <div className="relative w-full border-r">
                  {ticket && <TicketSummary ticket={ticket} />}
                  {/* <ChatMain conversation={conversation} isTyping={isTyping} />
                  {conversation && (
                    <div className="w-full bg-white">
                      <TypeChat
                        conversation={conversation}
                        setIsTyping={setIsTyping}
                        isTyping={isTyping}
                      />
                    </div>
                  )} */}
                </div>
                <div
                  className={`hidden w-full flex-col gap-5 overflow-y-auto xl:flex ${styles.scrollBars} py-5 md:h-[calc(100vh-197px)]`}
                >
                  {/* <SupportBookingSummary /> */}
                  {ticket && (
                    <Information>
                      <Information.User userId={ticket?.Assignee?.Id} />
                      {/* <Information.Ticket /> */}
                    </Information>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReAssignModal isOpen={reassignTicket} setIsOpen={setReassignTicket} />
      </div>
    </>
  );
};

export default UserChat;
