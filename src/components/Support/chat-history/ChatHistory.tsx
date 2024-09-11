import ChevronDown from "@/assets/icons/chevron-down.svg";
import ReadMail from "@/assets/icons/read-mail.svg";
import SearchIcon from "@/assets/icons/search2.svg";
import Star from "@/assets/icons/starred-mail.svg";
import UnreadMail from "@/assets/icons/unread-mail.svg";
import Unstar from "@/assets/icons/unstarred-mail.svg";
// import { H3, P, P2 } from "@/components/shared/headings/Headings";
import TickedMessage from "@/assets/icons/tick.svg";
// import { MessageStatus, type IConversation } from "@/services/chat/payload";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
// import { getChatConnection } from "@/store/slice/socket/socket.slice";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import Link from "next/link";
// import Avatar from "../../../user/avatar/Avatar";
import styles from "./ChatHistory.module.scss";
import { H3, P, P2 } from "@/components/Headings/Headings";
import { IConversation, MessageStatus } from "@/services/support/payload";
import Avatar from "@/components/Avatar/Avatar";
import Popup from "../Popup";
import { convertGrpcDate } from "@/utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getAssignedConversations,
  getUserConversations
} from "@/services/support";
import { useWebSocket } from "@/context/WebSocketContext";
import {
  setAssignedConversationsMeta,
  setConversationsMeta
} from "@/store/slice/support/chat.slice";

const ChatItem: React.FC<{
  conversation: IConversation;
  onClick: () => void;
  isActive: boolean;
  isStarred: boolean;
  toggleStar: () => void;
  filter: string;
  currentPage: number;
}> = ({
  conversation,
  isActive,
  isStarred,
  toggleStar,
  filter,
  currentPage
}) => {
  const user = useSelector(selectCurrentUser);

  const date =
    conversation.LastMessage?.CreatedAt &&
    convertGrpcDate(conversation.LastMessage?.CreatedAt);

  // console.log({ date, lll: conversation.LastMessage?.CreatedAt });

  const sender = useMemo(() => conversation?.User, [conversation?.User]);
  let lastChatTime = "";
  if (dayjs(new Date()).diff(date, "day") === 1) lastChatTime = "Yesterday";
  else if (dayjs(date).diff(new Date(), "day") === 0) {
    lastChatTime = dayjs(date).format("hh:mma");
  } else if (dayjs(date).diff(new Date(), "day") > -6) {
    lastChatTime = dayjs(date).format("dddd");
  } else lastChatTime = dayjs(date).format("DD MMM");

  return (
    <Link
      className={`flex w-full cursor-pointer flex-row items-center border-b px-3  py-2 hover:bg-white100 ${
        isActive && "bg-white100"
      }`}
      href={`/support/${conversation.Id}${filter ? `?history=${filter}${currentPage > 1 ? `&page=${currentPage}` : ""}` : ""}`}
    >
      <div>
        <Avatar
          Firstname={sender.Firstname}
          Lastname={sender.Lastname}
          Imageurl={sender.Imageurl}
          className="size-[64px]"
        />
      </div>
      {/* <div className="ml-4 "> */}
      <div className="ml-2">
        <P className="font-medium">
          {sender.Firstname} {sender.Lastname}
        </P>
        <P2 className={styles.conversationMessage}>
          {conversation.LastMessage?.Message}
        </P2>
      </div>
      <div className="ml-auto flex flex-col items-center">
        <div className="flex flex-row items-center justify-center gap-2">
          <P2 className="text-nowrap text-white700">{lastChatTime}</P2>
          <span onClick={toggleStar}>{isStarred ? <Star /> : <Unstar />}</span>
        </div>
        <div className="ml-auto mt-2 flex flex-row items-center gap-2">
          {conversation.LastMessage?.Sender.Id !== user.Id &&
          conversation.UnReadCount ? (
            <P2 className="size-[21px] rounded-[10px] bg-primary400 text-center text-white">
              {conversation.UnReadCount}
            </P2>
          ) : (
            <></>
          )}
          {conversation.LastMessage?.Status === MessageStatus.Read ? (
            <>
              {conversation.LastMessage?.Sender.Id !== user.Id && (
                <UnreadMail />
              )}
              {conversation.LastMessage?.Sender.Id === user.Id && (
                <TickedMessage />
              )}
            </>
          ) : (
            <>
              {conversation.LastMessage?.Sender.Id !== user.Id && <ReadMail />}
              {/* {conversation.LastMessage?.Sender.Id === user.Id && (
                <TickedMessage />
              )} */}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

const ChatHistory: React.FC<{
  onClickConversation: (convo: IConversation) => void;
  conversations: IConversation[];
  title?: string;
  activeConversation: string;
  filter: string;
  metaData: {
    CurrentPage: number;
    TotalPages: number;
  };
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  onClickConversation,
  conversations,
  activeConversation,
  title = "All Messages",
  filter,
  metaData,
  isFetching,
  setIsFetching
}) => {
  const [starredConversations, setStarredConversations] = useState<string[]>(
    []
  );
  const socket = useWebSocket();

  console.log({ metaData });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const dispatch = useDispatch();

  const toggleStarredConversation = useCallback(
    (conversationId: string) => {
      if (starredConversations.includes(conversationId)) {
        setStarredConversations((prev) => {
          const index = prev.findIndex((item) => item === conversationId);
          prev.splice(index, 1);
          localStorage.setItem("CH-STARREDCONVERSATIONS", prev.join(","));
          return prev;
        });
      } else if (starredConversations.length + 1 < 4) {
        setStarredConversations((prev) => [...prev, conversationId]);
        localStorage.setItem(
          "CH-STARREDCONVERSATIONS",
          [...starredConversations, conversationId].join(",")
        );
      }
    },
    [starredConversations, setStarredConversations]
  );

  const sortedConversations = [...conversations].sort((a, b) => {
    const aIsStarred = !!starredConversations.find((item) => item === a.Id);
    const bIsStarred = !!starredConversations.find((item) => item === b.Id);

    // Sort starred conversations to come first
    if (aIsStarred && !bIsStarred) return -1;
    if (!aIsStarred && bIsStarred) return 1;
    return 0;
  });

  // const finalConversations =
  //   filteredConversation.length > 0
  //     ? filteredConversation
  //     : sortedConversations;

  // console.log({ filteredConversation });
  useEffect(() => {
    const items = localStorage
      ? localStorage.getItem("CH-STARREDCONVERSATIONS")
      : "";

    setStarredConversations(items?.split(",") || []);

    return () => {};
  }, []);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const divEl = ref.current;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (
          entry.isIntersecting &&
          metaData.CurrentPage !== metaData.TotalPages &&
          metaData.TotalPages !== 0
        ) {
          if (filter === "active" && socket) {
            getAssignedConversations(socket, metaData.CurrentPage + 1);
            dispatch(
              setAssignedConversationsMeta({
                ...metaData,
                CurrentPage: metaData.CurrentPage + 1
              })
            );
          } else if (socket && filter === "new") {
            getUserConversations(socket, metaData.CurrentPage + 1);
            dispatch(
              setConversationsMeta({
                ...metaData,
                CurrentPage: metaData.CurrentPage + 1
              })
            );
          }
          // meta.current = {
          //   ...meta.current,
          //   CurrentPage: meta.current.CurrentPage + 1
          // };
        }
      },
      {
        root: null,
        threshold: 0.1
      }
    );

    if (divEl) observer.observe(divEl);

    return () => {
      if (divEl) observer.unobserve(divEl);
    };
  }, [filter, socket, metaData, dispatch, isFetching, setIsFetching]);

  console.log({ metaData });

  return (
    <div className="">
      <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 p-3">
        <div className="flex flex-row items-center gap-3 relative">
          <Popup>
            <Popup.Window name="history-popup">
              <Popup.Btn onClick={() => router.push(`${pathname}?history=new`)}>
                New
              </Popup.Btn>
              <Popup.Btn
                onClick={() => router.push(`${pathname}?history=active`)}
              >
                Active
              </Popup.Btn>
              <Popup.Btn>Re-assigned</Popup.Btn>
            </Popup.Window>
            <Popup.Open opens="history-popup">
              <Test>
                <H3>{title}</H3>
                <ChevronDown />
              </Test>
            </Popup.Open>
          </Popup>
        </div>
        <div className="relative mt-4 ">
          <SearchIcon className="absolute left-2 top-3" />

          <input
            placeholder="Search"
            className="h-[43px] w-[90%] max-w-[336px] border border-white600 pl-10 placeholder:text-white700"
          />
        </div>
      </div>
      <div className="flex flex-col">
        {conversations.map((convo: IConversation) => (
          <ChatItem
            currentPage={+pageNum || metaData.CurrentPage}
            filter={filter}
            isStarred={!!starredConversations.find((item) => item === convo.Id)}
            conversation={convo}
            key={convo.Id}
            isActive={activeConversation === convo.Id}
            onClick={() => onClickConversation(convo)}
            toggleStar={() => toggleStarredConversation(convo.Id)}
          />
        ))}
      </div>
      {!isFetching &&
        conversations?.length > 0 &&
        metaData.CurrentPage !== metaData.TotalPages &&
        metaData.TotalPages !== 0 && (
          <div className="h-20" ref={ref}>
            hahahahaha
          </div>
        )}
    </div>
  );
};

function Test({
  children,
  onClick
}: {
  children: JSX.Element | JSX.Element[];
  onClick?: () => void;
}) {
  return (
    <span
      role="button"
      className="flex items-center gap-3"
      onClick={(e) => {
        onClick?.();
        e.stopPropagation();
      }}
    >
      {children}
    </span>
  );
}

export default ChatHistory;
