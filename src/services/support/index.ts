import { NewTicket } from "./payload";

export const getUserConversations = (socket: WebSocket) => {
  const msg = {
    Type: "PENDING_REQUESTS"
  };
  socket.send(JSON.stringify(msg));
};

export const createTicket = ({
  socket,
  ConversationId,
  assigneeId,
  Title,
  Subtitle,
  Description
}: NewTicket) => {
  const msg = {
    Data: {
      ConversationId,
      Ticket: {
        Title,
        Subtitle,
        Description
      },
      Assignee: {
        Id: assigneeId
      }
    },
    Type: "CREATE_TICKET"
  };

  console.log({ msg }, "called");

  socket.send(JSON.stringify(msg));
};

export const getConversationMessages = (
  socket: WebSocket,
  ConversationId: string
) => {
  const msg = {
    // ConversationId,
    Data: {
      conversationId: ConversationId
    },
    Type: "CONVERSATION_MESSAGES"
  };
  socket.send(JSON.stringify(msg));
};

export const updateConversationStatus = (
  socket: WebSocket,
  ConversationId: string
) => {
  const msg = {
    ConversationId,
    Type: "MESSAGE_READ"
  };
  socket.send(JSON.stringify(msg));
};

export const sendChatMessage = (
  socket: WebSocket,
  message: string,
  conversationId: string,
  RecipientId?: string
) => {
  const msg = {
    Message: message,
    ConversationId: conversationId,
    Recipient: { Id: RecipientId },
    Type: "POST_MESSAGE"
  };
  socket.send(JSON.stringify(msg));
};

export const getRecipientStatus = (
  socket: WebSocket,
  ConversationId: string
) => {
  const msg = {
    ConversationId,
    Type: "RECIPIENT_STATUS"
  };
  socket.send(JSON.stringify(msg));
};
