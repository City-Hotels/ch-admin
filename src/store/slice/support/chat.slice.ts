import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "@/store";
import { IConversation, TicketEntry } from "@/services/support/payload";
// import type { IConversation } from "@/services/chat/payload";

type ChatStoreState = {
  conversations?: IConversation[];
  assignedConversations: IConversation[];
  tickets?: TicketEntry[];
  isConnecting?: boolean;
  isConnected?: boolean;
};

const initialState: ChatStoreState = {
  conversations: undefined,
  assignedConversations: [],
  tickets: []
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
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },

    setTickets: (state, action: PayloadAction<TicketEntry[]>) => {
      state.tickets = action.payload;
    },
    setAssignedConversations: (state, action) => {
      state.assignedConversations = action.payload;
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
  setAssignedConversations,
  setConnecting,
  setConnected,
  setTickets
} = chat.actions;
export default chat.reducer;

export const getChatConversations = (state: RootState) =>
  state.chat.conversations;
export const getAssignedUserConversations = (state: RootState) =>
  state.chat.assignedConversations;
export const getTickets = (state: RootState) => state.chat.tickets;
export const isChatConnected = (state: RootState) => state.chat.isConnected;
export const isChatConnecting = (state: RootState) => state.chat.isConnecting;
