import { getRecipientStatus } from "@/services/support";
import type { IConversation, TicketEntry } from "@/services/support/payload";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "@/context/WebSocketContext";
// import { H5, P2 } from "../../headings/Headings";
import Avatar from "@/components/Avatar/Avatar";
import { H5, P2 } from "@/components/Headings/Headings";

const ChatRecipient: React.FC<{ ticket?: TicketEntry }> = ({ ticket }) => {
  const [isOnline, setIsOnline] = useState(false);
  const user = useSelector(selectCurrentUser);
  const socket = useWebSocket();
  const recipient = useMemo(() => ticket?.Assignee, [ticket?.Assignee]);

  return (
    <div className="flex gap-4 items-center">
      <Avatar
        Firstname={recipient?.Firstname || ""}
        Lastname={recipient?.Lastname || ""}
        Imageurl={recipient?.Imageurl || ""}
        className="size-14 !bg-primary400"
      />
      <div className="flex w-full flex-col">
        <H5>
          {recipient?.Firstname} {recipient?.Lastname}
        </H5>
        <P2>{isOnline ? "online" : ""}</P2>
      </div>
    </div>
  );
};

export default ChatRecipient;
