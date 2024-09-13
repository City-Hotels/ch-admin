import { NewTicket, TimeStamp } from "./payload";
import { putRequest } from "@/utils/api/calls";

export const getUserConversations = (
  socket: WebSocket,
  CurrentPage?: number
) => {
  const msg = {
    Data: {
      Meta: {
        CurrentPage
      }
    },
    Type: "PENDING_REQUESTS"
  };
  socket.send(JSON.stringify(msg));
};

export const getAssignedConversations = (
  socket: WebSocket,
  CurrentPage?: number
) => {
  const msg = {
    Data: {
      Meta: {
        CurrentPage
      }
    },
    Type: "LIST_ASSIGNED_CONVERSATIONS"
  };

  socket.send(JSON.stringify(msg));
};

export const getTicketsList = (socket: WebSocket, CurrentPage?: number) => {
  console.log({ CurrentPage });

  const msg = {
    Data: {
      TicketId: "",
      Meta: {
        CurrentPage
      }
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
      TicketId: ticketId,
      Status: status
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
  Status: number;
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
  ConversationId: string,
  CurrentPage?: number
) => {
  const msg = {
    Data: {
      conversationId: ConversationId,
      Meta: {
        CurrentPage
      }
    },
    Type: "CONVERSATION_MESSAGES"
  };
  socket.send(JSON.stringify(msg));
};

export const updateConversationStatus = (
  socket: WebSocket,
  ConversationId: string
) => {
  console.log("works-------hahahaha");

  const msg = {
    Data: {
      ConversationId,
      Status: 1
    },
    Type: "MESSAGE_READ"
  };
  socket.send(JSON.stringify(msg));
};

export const sendChatMessage = (
  socket: WebSocket,
  message: string,
  conversationId: string,
  RecipientId?: string,
  createdAt?: TimeStamp
) => {
  console.log({ message, RecipientId });

  const msg = {
    Data: {
      ConversationId: conversationId,
      Message: message,
      Recipient: { Id: RecipientId },
      ...(createdAt && { CreatedAt: createdAt })
    },
    Type: "POST_MESSAGE"
  };
  socket.send(JSON.stringify(msg));
};

const chatImageUploadBaseUrl = process.env.NEXT_SUPPORT_FILE_UPLOAD_URL;

export async function uploadSupportChatImages(
  images: File[],
  messageId: string
) {
  const imageFiles = images.map((img) => {
    const newFile = new FormData();
    newFile.append("file", img);

    return newFile;
  });

  const res = await Promise.all(
    imageFiles.map((imgFileData) =>
      putRequest<FormData, { Path: string }>({
        url: `${chatImageUploadBaseUrl}/${messageId}`,
        data: imgFileData
      })
    )
  );

  return res;
}

export const getRecipientStatus = (
  socket: WebSocket,
  ConversationId: string
) => {
  const msg = {
    Data: {
      ConversationId
    },
    Type: "RECIPIENT_STATUS"
  };

  socket.send(JSON.stringify(msg));
};
