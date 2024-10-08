import type {
  IConversation,
  IListConversationResponse,
  IMessage
} from "@/services/support/payload";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getAssignedConversations,
  getUserConversations,
  updateStatus
} from "@/services/support";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import { useParams, useSearchParams } from "next/navigation";
import type { IUser } from "@/services/user/payload";
import { useWebSocket } from "@/context/WebSocketContext";
import {
  getAssignedConversationsMeta,
  getAssignedUserConversations,
  getChatConversations,
  getConversationsMeta,
  setAssignedConversations,
  setAssignedConversationsMeta,
  setConversations
} from "@/store/slice/support/chat.slice";
import { useRouter } from "next/navigation";
import ChatRecipient from "../chat-main/ChatRecipient";
// import TypeChat from "../chat-main/TypeChat";
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
import TypeChat from "../chat-main/TypeChat-2";

const ConvoStatus = [
  { name: "New", value: 10 },
  { name: "On-hold", value: 0 },
  { name: "Resolved", value: 1 }
];

const UserChat: React.FC<{ showConversation?: boolean }> = ({
  showConversation
}) => {
  const [conversation, setConversation] = useState<IConversation>();

  const chatConversations = useSelector(getChatConversations);
  const assignedConversations = useSelector(getAssignedUserConversations);
  const conversations = useMemo(
    () => chatConversations || [],
    [chatConversations]
  );

  const selectedUser = useSelector(selectCurrentUser) || {};
  const user = useMemo(() => selectedUser || {}, [selectedUser]);

  const router = useRouter();
  const { idOrSlug } = useParams<{ idOrSlug: string }>();

  const socket = useWebSocket();
  const dispatch = useDispatch();
  // const user = useSelector(selectCurrentUser) || {};
  const [isTyping, setIsTyping] = useState(false);
  const search = useSearchParams();
  const [createTicketOpen, setCreateTicketOpen] = useState(false);

  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [isFocused, setIsFocused] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const filter = searchParams.get("history") || "new";
  const activeConvoMeta = useSelector(getAssignedConversationsMeta);
  const conversationsMeta = useSelector(getConversationsMeta);
  // const meta = useRef<{ CurrentPage: number; TotalPages: number }>(activeConvoMeta);
  const stableConversations = useRef<IConversation[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log("fourth")
    if (!socket) return;

    function handler(e: MessageEvent<any>) {
      const msg = JSON.parse(e.data);

      if (msg.Type === "CONVERSATIONS") {
        const data = msg.Data as IListConversationResponse;
        if (
          conversationsMeta.TotalPages !== 0 &&
          // conversationsMeta.CurrentPage !== conversationsMeta.TotalPages &&
          data.Meta.CurrentPage !== 1
        ) {
          setIsFetching(false);

          dispatch(
            setConversations([
              ...conversations,
              ...data.Conversations
            ] as IConversation[])
          );
        }
      }

      return e;
    }

    socket.addEventListener("message", handler);

    return () => {
      socket.removeEventListener("message", handler);
    };
  }, [
    socket,
    conversations,
    dispatch,
    conversations.length,
    conversationsMeta
  ]);

  useEffect(() => {
    if (!socket) return;
    function handler(e: MessageEvent<any>) {
      const data = JSON.parse(e.data) as {
        Data: {
          Meta: {
            CurrentPage: number;
            TotalPages: number;
          };
          Conversations: IConversation[];
        };
        Type: string;
      };

      if (data.Type === "LIST_CONVERSATIONS") {
        if (activeConvoMeta.CurrentPage === 1) {
          dispatch(setAssignedConversationsMeta(data.Data.Meta));

          dispatch(
            setAssignedConversations(data.Data.Conversations as IConversation[])
          );
          stableConversations.current = data.Data
            .Conversations as IConversation[];
        } else if (activeConvoMeta.TotalPages !== 0) {
          setIsFetching(false);
          dispatch(
            setAssignedConversations([
              ...assignedConversations,
              ...data.Data.Conversations
            ] as IConversation[])
          );
        }

        return e;
      }
    }
    socket.addEventListener("message", handler);

    if (
      activeConvoMeta.CurrentPage === 1 &&
      activeConvoMeta.TotalPages === 0 &&
      !assignedConversations?.length
    ) {
      getAssignedConversations(socket);
    }

    return () => {
      socket.removeEventListener("message", handler);
    };
  }, [socket, dispatch, assignedConversations, activeConvoMeta]);

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
    console.log("third")
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
    console.log("second")
    if (!socket) {
      return () => { };
    }
    if (socket && conversations?.length < 1) getUserConversations(socket);

    const handler = (event: MessageEvent<any>) => {
      const msg = JSON.parse(event.data);
      if (msg.Type === "INCOMING_MESSAGE") {
        const data = msg.Data as IMessage;
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
  const finalConversationList = useMemo(
    () => (filter === "new" ? conversations : assignedConversations),

    [filter, conversations, assignedConversations]
  );

  const finalConvoMeta = useMemo(
    () => (filter === "new" ? conversationsMeta : activeConvoMeta),

    [filter, conversationsMeta, activeConvoMeta]
  );

  useEffect(() => {
    console.log("first")
    if (finalConversationList && idOrSlug?.toString()) {
      const convo = finalConversationList.find(
        (item) => item.Id === idOrSlug?.toString()
      );
      setConversation(convo);
    }

    return () => { };
  }, [finalConversationList, idOrSlug]);

  function handleUpdateStatus(status: number) {
    if (!socket || !idOrSlug) return;

    const data = {
      socket,
      Status: status,
      ConversationId: idOrSlug
    };

    updateStatus(data);
  }

  return (
    <>
      <div className="h-full rounded-md border border-[#ddd] lg:min-w-[90vw]">
        <div className="relative flex h-full flex-col">
          <div className="flex size-full">
            <div
              className={`${showConversation ? "hidden lg:block" : "lg:block"
                } w-full overflow-y-auto overflow-x-hidden border-r md:w-[350px]  ${styles.scrollBars
                }`}
            >
              <ChatHistory
                isFetching={isFetching}
                setIsFetching={setIsFetching}
                metaData={finalConvoMeta}
                filter={filter}
                onClickConversation={setConversation}
                conversations={finalConversationList || []}
                activeConversation={conversation?.Id || ""}
              />
            </div>
            <div
              className={`${showConversation
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
                          <>
                            {ConvoStatus.map((data, i) => (
                              <Popup.Btn
                                key={i}
                                onClick={() => handleUpdateStatus(data.value)}
                              >
                                {data.name}
                              </Popup.Btn>
                            ))}
                          </>
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
                    // isFocused={isFocused}
                    conversation={conversation}
                    isTyping={isTyping}
                    onSend_receive_message={setMessages}
                    sent_received_messages={messages}
                  />
                  {conversation && (
                    <div className="w-full bg-white">
                      <TypeChat
                        isTyping={isTyping}
                        conversation={conversation}
                        setIsTyping={setIsTyping}
                        onSend_receive_message={setMessages}
                      />
                      {/* <TypeChat
                        conversation={conversation}
                        setIsTyping={setIsTyping}
                        isTyping={isTyping}
                        onSend_receive_message={setMessages}

                        // message={message}
                        // setMessage={setMessage}
                      /> */}
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
