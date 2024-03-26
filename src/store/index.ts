import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch, useSelector, useStore } from 'react-redux'
import {
  nextReduxCookieMiddleware,
  wrapMakeStore
} from "next-redux-cookie-wrapper";
import authReducer from "./slice/auth/auth.slice";
// import hotelReducer from "./slice/hotel/hotel.slice";
// import bookingReducer from "./slice/booking/booking.slice";
// import apartmentReducer from "./slice/apartment/apartment.slice";
// import roomReducer from "./slice/room/room.slice";
// import socketReducer from "./slice/socket/socket.slice";

// const combinedReducer = combineReducers({
//   auth: authReducer,
//   socket: socketReducer
// });

export const makeStore = () =>
  configureStore({
    reducer: authReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: [{ subtree: 'auth' }]
          })
        )
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
