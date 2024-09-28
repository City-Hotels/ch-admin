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
  getTicketsMeta,
  setTickets,
  setTicketsMeta
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
import { Meta } from "@/utils/api/calls";

const ticketStatus = [
  { name: "Pending", value: 0 },
  { name: "Resolved", value: 1 },
  { name: "Closed", value: 2 }
];

const UserChat: React.FC<{ showConversation?: boolean }> = ({
  showConversation
}) => {
  const [ticket, setTicket] = useState<TicketEntry>();
  const tickets = useSelector(getTickets);
  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const socket = useWebSocket();
  const user = useSelector(selectCurrentUser) || {};
  const [reassignTicket, setReassignTicket] = useState(false);

  const stableSocket = useMemo(() => socket, [socket]);
  const metaData = useSelector(getTicketsMeta) as Meta;
  const [isFetching, setIsfetching] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) {
      return () => {};
    }

    if (metaData.TotalPages === 0 && !tickets?.length) {
      getTicketsList(socket);
    }

    function handler(event: MessageEvent<any>) {
      const msg = JSON.parse(event.data);
      if (msg.Type === "TICKET_LIST") {
        const data = msg?.Data?.Tickets as TicketEntry[];

        if (msg.Data.Meta.CurrentPage === 1) {
          dispatch(setTickets(data));
          dispatch(setTicketsMeta(msg.Data.Meta as Meta));
        } else if (
          msg.Data.Meta.TotalPages !== 0 &&
          tickets?.length &&
          metaData.CurrentPage !== metaData.TotalPages
        ) {
          dispatch(
            setTickets([...tickets, ...(msg?.Data?.Tickets as TicketEntry[])])
          );
          setIsfetching(false);
        }
      }
      return event;
    }

    socket.addEventListener("message", handler);

    return () => {
      socket.removeEventListener("message", handler);
    };
  }, [user.Id, socket, dispatch, tickets, metaData]);

  useEffect(() => {
    if (idOrSlug?.toString()) {
      const openTicket = tickets?.find((item) => item.Id === String(idOrSlug));
      setTicket(openTicket);
    }

    return () => {};
  }, [tickets, tickets?.length, idOrSlug]);

  function handleUpdateStatus(status: number) {
    if (!socket || !idOrSlug) return;

    const data = {
      socket,
      status,
      ticketId: idOrSlug
    };

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
                isFetching={isFetching}
                setIsFetching={setIsfetching}
                metaData={metaData}
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
                        </Popup.Window>
                        <Popup.Open opens="ticket-status">
                          <button className="bg-white size-full px-3 py-1 border border-white500 text-start rounded-md flex justify-between items-center">
                            New
                            <ChevronDown />
                          </button>
                        </Popup.Open>
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
                </div>
                <div
                  className={`hidden w-full flex-col gap-5 overflow-y-auto xl:flex ${styles.scrollBars} py-5 md:h-[calc(100vh-197px)]`}
                >
                  {ticket && (
                    <Information>
                      <Information.User userId={ticket?.Assignee?.Id} />
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
