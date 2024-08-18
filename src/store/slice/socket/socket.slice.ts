import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "@/store";

type SocketStoreState = {
  chatConnection?: WebSocket;
  notificationConnection?: WebSocket;
  isConnecting?: boolean;
  isConnected?: boolean;
};

const initialState: SocketStoreState = {
  chatConnection: undefined,
  notificationConnection: undefined
};

const socket = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<WebSocket | undefined>) => {
      if (action.payload) state.chatConnection = action.payload;
      state.isConnected = !!action.payload;
      state.isConnecting = false;
    },
    setNotificatioinConnection: (
      state,
      action: PayloadAction<WebSocket | undefined>
    ) => {
      if (action.payload) state.notificationConnection = action.payload;
      state.isConnected = !!action.payload;
      // state.isConnecting = false;
    },
    setConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    }
  }
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.room
  //     };
  //   }
  // }
});

export const {
  setConnection,
  setConnecting,
  setConnected,
  setNotificatioinConnection
} = socket.actions;
export default socket.reducer;

export const getChatConnection = (state: RootState) =>
  state.socket.chatConnection;
export const getNotificationConnection = (state: RootState) =>
  state.socket.chatConnection;
export const isChatConnected = (state: RootState) => state.socket.isConnected;
export const isChatConnecting = (state: RootState) => state.socket.isConnecting;
