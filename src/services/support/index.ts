import { NewTicket } from "./payload";

export const getUserConversations = (socket: WebSocket) => {
  const msg = {
    Type: "PENDING_REQUESTS"
  };
  socket.send(JSON.stringify(msg));
};

export const getAssignedConversations = (socket: WebSocket) => {
  const msg = {
    Data: {},
    Type: "LIST_ASSIGNED_CONVERSATIONS"
  };

  socket.send(JSON.stringify(msg));
};

export const getTicketsList = (socket: WebSocket) => {
  const msg = {
    Data: {
      TicketId: ""
    },
    Type: "LIST_TICKETS"
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

  socket.send(JSON.stringify(msg));
  console.log("works", msg);
  // const res = socket.send(JSON.stringify(msg));
  // console.log({ res }, "called");
};

export const reassignTicket = ({
  ticketId,
  AssigneeId,
  socket
}: {
  ticketId: string;
  AssigneeId: string;
  socket: WebSocket;
}) => {
  const msg = {
    Data: {
      ticketId,
      Assignee: {
        Id: AssigneeId
      }
    },
    Type: "REASSIGN_TICKET"
  };

  console.log({ msg });

  socket.send(JSON.stringify(msg));
};

export const updateTicketStatus = ({
  socket,
  ticketId,
  status
}: {
  socket: WebSocket;
  ticketId: string;
  status: number;
}) => {
  const msg = {
    Data: {
      TicketId: ticketId, //"66b2ab79f2f5646940874b9e",
      Status: status //1
    },
    Type: "UPDATE_TICKET_STATUS"
  };

  console.log(msg);

  socket.send(JSON.stringify(msg));
};

export const updateStatus = ({
  ConversationId,
  Status,
  socket
}: {
  ConversationId: string;
  Status: string;
  socket: WebSocket;
}) => {
  const msg = {
    Data: {
      ConversationId,
      Status
    },
    Type: "UPDATE_STATUS"
  };

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
    Data: {
      ConversationId
    },
    Type: "MESSAGE_READ"
  };
  socket.send(JSON.stringify(msg));
};

// {
//   "Data": {
//     "conversationId":"66b042800ba5b8ca81393a3e"
//   },

//   "Type": "MESSAGE_READ"
// }

export const sendChatMessage = (
  socket: WebSocket,
  message: string,
  conversationId: string,
  RecipientId?: string
) => {
  console.log({ message, RecipientId });

  const msg = {
    Data: {
      // ConversationId: "",
      ConversationId: conversationId,
      Message: message,
      Recipient: { Id: RecipientId }
    },
    Type: "POST_MESSAGE"
  };
  // console.log({ msg });
  socket.send(JSON.stringify(msg));
};

// {
//   "Data": {
//       "ConversationId": "",
//       "Message": "ticket test",
//       "Recipient": {
//           "Id": "d73bc724-9656-4f74-a174-9a538381ce57"
//       }
//   },
//   "Type": "POST_MESSAGE"
// }

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
