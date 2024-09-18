import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "@/store";
import { IConversation, TicketEntry } from "@/services/support/payload";
// import type { IConversation } from "@/services/chat/payload";

type ChatStoreState = {
  conversations?: IConversation[];
  conversationsMeta: { CurrentPage: number; TotalPages: number };
  assignedConversations: IConversation[];
  assignedConversationsMeta: { CurrentPage: number; TotalPages: number };
  tickets?: TicketEntry[];
  ticketsMeta: { CurrentPage: number; TotalPages: number };
  isConnecting?: boolean;
  isConnected?: boolean;
};

const initialState: ChatStoreState = {
  conversations: undefined,
  assignedConversations: [],
  tickets: [],
  assignedConversationsMeta: { CurrentPage: 1, TotalPages: 0 },
  conversationsMeta: { CurrentPage: 1, TotalPages: 0 },
  ticketsMeta: { CurrentPage: 1, TotalPages: 0 }
};

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<IConversation[]>) => {
      state.conversations = action.payload;
      state.isConnected = !!action.payload;
      state.isConnecting = false;
    },
    setConversationsMeta: (state, action) => {
      state.conversationsMeta = action.payload;
    },
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },

    setTickets: (state, action: PayloadAction<TicketEntry[]>) => {
      state.tickets = action.payload;
    },
    setTicketsMeta: (state, action) => {
      state.ticketsMeta = action.payload;
    },
    setAssignedConversations: (state, action) => {
      state.assignedConversations = action.payload;
    },
    setAssignedConversationsMeta: (state, action) => {
      state.assignedConversationsMeta = action.payload;
    }
  }

  // extraReducers: {
  //   // [HYDRATE]: (state, action) => {
  //    (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.room
  //     };
  //   }
  // }
});

export const {
  setConversations,
  setConversationsMeta,
  setAssignedConversations,
  setAssignedConversationsMeta,
  setConnecting,
  setConnected,
  setTickets,
  setTicketsMeta
} = chat.actions;
export default chat.reducer;

export const getChatConversations = (state: RootState) =>
  state.chat.conversations;
export const getConversationsMeta = (state: RootState) =>
  state.chat.conversationsMeta;
export const getAssignedUserConversations = (state: RootState) =>
  state.chat.assignedConversations;
export const getAssignedConversationsMeta = (state: RootState) =>
  state.chat.assignedConversationsMeta;
export const getTickets = (state: RootState) => state.chat.tickets;
export const getTicketsMeta = (state: RootState) => state.chat.ticketsMeta;
export const isChatConnected = (state: RootState) => state.chat.isConnected;
export const isChatConnecting = (state: RootState) => state.chat.isConnecting;
