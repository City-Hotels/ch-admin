import { getUserConversations } from "@/services/support";
import type {
  IChatSocketMessageEventData,
  IConversation,
  IListConversationResponse
} from "@/services/support/payload";
import type { AppDispatch } from "@/store";
import { selectCurrentUser } from "@/store/slice/auth/auth.slice";
import {
  setConnected,
  setConnecting,
  setConversations,
  setConversationsMeta
} from "@/store/slice/support/chat.slice";
import { initiateChatConnection } from "@/utils/api/ws";
import type { ReactNode } from "react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";

type WebSocketContextType = WebSocket | null;

const WebSocketContext = createContext<WebSocketContextType>(null);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children
}) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectCurrentUser);

  const reconnect = (): WebSocket | null => {
    const websocket = initiateChatConnection();

    if (!websocket) return null;

    websocket.onopen = () => {
      dispatch(setConnecting(false));
      dispatch(setConnected(true));
      getUserConversations(websocket);
      // wsRef.current = websocket;
      setWs(websocket);
    };

    websocket.onmessage = (event: MessageEvent<any>) => {
      const msg = JSON.parse(event.data) as IChatSocketMessageEventData;
      if (msg.Type === "CONVERSATIONS") {
        const data = msg.Data as IListConversationResponse;
        if (data.Meta.CurrentPage === 1) {
          dispatch(setConversationsMeta(data.Meta));
          dispatch(setConversations(data.Conversations as IConversation[]));
        }
      }
      return event;
    };

    websocket.onclose = () => {
      dispatch(setConnecting(false));
      dispatch(setConnected(false));
      reconnect();
    };

    websocket.onerror = (error) => {
      console.error("WEBSOCKET ERROR:", error);
      dispatch(setConnecting(false));
      dispatch(setConnected(false));
      reconnect();
    };

    return websocket;
  };

  useEffect(() => {
    console.log({ user });
    if (ws) return () => {};
    if (!user)
      return () => {
        setWs(null);
        setConversations([]);
      };

    const websocket = reconnect();

    return () => {
      // websocket?.close();
    };
  }, [user, ws, setWs]);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  return useContext(WebSocketContext);
};
