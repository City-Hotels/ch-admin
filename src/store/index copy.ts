import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore
} from "next-redux-cookie-wrapper";
import authReducer from "./slice/auth/auth.slice";
import socketReducer from "./slice/socket/socket.slice";
import chatReducer from "./slice/support/chat.slice";

const combinedReducer = combineReducers({
  auth: authReducer,
  socket: socketReducer,
  chat: chatReducer
});

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: combinedReducer,
    middleware: (gDM) =>
      gDM()
        .concat()
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: [{ subtree: "auth" }]
          })
        )
  })
);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
