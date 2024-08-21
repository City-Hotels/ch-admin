import type { Meta } from "@/utils/api/calls";

export enum MessageStatus {
  Unread,
  Read = 1
}

export interface IUser {
  Id: string;
  Firstname: string;
  Lastname: string;
  Imageurl: string;
}

export interface TimeStamp {
  seconds: number;
  nanos: number;
}

export interface Feedback {
  Rating: number;
  Comment: string;
}

export enum ConversationStatus {
  Pending,
  Active = 1,
  Closed = 2
}

export enum TicketStatus {
  Pending,
  Resolved = 1,
  Closed = 2
}

export interface TicketEntry {
  Id: string;
  Title: string;
  Subtitle: string;
  Description: string;
  Assignee: IUser;
  Status?: TicketStatus;
  CreatedAt?: TimeStamp;
  LastUpdated?: TimeStamp;
  Creator: IUser;
}

export interface Message {
  Id: string;
  ConversationId: string;
  Message: string;
  Type: string;
  Sender: IUser;
  Recipient: IUser;
  Status: MessageStatus;
  CreatedAt: TimeStamp;
  UpdatedAt: TimeStamp;
  TicketEntry: TicketEntry;
}

export interface IConversation {
  Id: string;
  User: IUser;
  Ticket: string;
  SupportAgent: IUser;
  LastMessage?: IMessage;
  UnReadCount: number;
  Status?: ConversationStatus;
  Feedback: string;
  CreatedAt?: TimeStamp;
  UpdatedAt?: TimeStamp;
}

export interface IMessage {
  Id: string;
  ConversationId: string;
  Message: string;
  SenderId: string;
  RecipientId: string;
  Type: string;
  Sender: IUser;
  Recipient: IUser;
  Status: MessageStatus;
  CreatedAt: string;
  UpdatedAt: string;
}
export interface IChatSocketMessageEventData {
  Type: string;
  Data: IMessage | IListConversationResponse;
}

export interface IListConversationResponse {
  Conversations: IConversation[];
  Meta: Meta;
}

export interface NewTicket {
  socket: WebSocket;
  ConversationId: string;
  assigneeId: string;
  Title: string;
  Subtitle: string;
  Description: string;
}
