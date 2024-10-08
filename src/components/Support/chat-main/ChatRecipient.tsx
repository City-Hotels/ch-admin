import { getRecipientStatus } from "@/services/support";
import type { IConversation } from "@/services/support/payload";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useWebSocket } from "@/context/WebSocketContext";
// import { H5, P2 } from "../../headings/Headings";
import Avatar from "@/components/Avatar/Avatar";
import { H5, P2 } from "@/components/Headings/Headings";

const ChatRecipient: React.FC<{ conversation?: IConversation }> = ({
  conversation
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const user = useSelector(selectCurrentUser);
  const socket = useWebSocket();
  const recipient = useMemo(() => conversation?.User, [conversation?.User]);

  useEffect(() => {
    if (!socket || !conversation?.Id) return;

    setTimeout(() => {
      getRecipientStatus(socket, conversation.Id);
    }, 3000);
  }, [conversation?.Id, socket]);

  useEffect(() => {
    if (!socket) return;

    function handler(e: MessageEvent<any>) {
      const msg = JSON.parse(e.data) as {
        Data: {
          active: boolean;
        };
        Type: string;
      };

      if (msg.Type === "RECIPIENT_STATUS") setIsOnline(msg.Data.active);
    }

    socket.addEventListener("message", handler);

    return () => {
      socket.removeEventListener("message", handler);
    };
  }, [socket]);

  return (
    <div className="flex gap-4 items-center">
      <Avatar
        Firstname={recipient?.Firstname || ""}
        Lastname={recipient?.Lastname || ""}
        Imageurl={recipient?.Imageurl || ""}
        className="size-14"
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
