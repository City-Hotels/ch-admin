import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "@/store/index";
import type { IUser } from "@/services/user/payload";
import { getProfile } from "@/services/user";

export type AuthState = {
  User: IUser;
  IsLoading: boolean;
  IsLoggedIn: boolean;
  Token?: string;
  LoginId: string | null;
};

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const response = await getProfile();
    return response.data;
  }
);

const slice = createSlice({
  name: "auth",
  initialState: { IsLoading: false, IsLoggedIn: false } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ Token: string }>) => {
      localStorage.setItem("CHID", action.payload.Token);
      state.IsLoading = false;
      state.IsLoggedIn = true;
    },
    setLoginId: (state, action: PayloadAction<{ LoginId: string }>) => {
      state.LoginId = action.payload.LoginId;
    },
    setCurrentUser: (state, action: PayloadAction<{ User: IUser }>) => {
      state.User = action.payload.User;
    },
    setResetToken: (state, action: PayloadAction<{ Token: string }>) => {
      state.Token = action.payload.Token;
    },
    removeCredentials: (state) => {
      localStorage.removeItem("CHID");
      state.IsLoading = false;
      state.IsLoggedIn = false;
      state.Token = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.IsLoading = true;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.User = action.payload;
          state.IsLoading = false;
        }
      )
      .addCase(fetchUserProfile.rejected, (state) => {
        state.IsLoading = false;
        // TODO: Deal with error state or account suspension later
      })
      .addMatcher(
        (action) => action.type === HYDRATE && "auth" in action.payload,
        (state, action: PayloadAction<{ auth: AuthState }>) => {
          return {
            ...state,
            ...action.payload.auth
          };
        }
      );
  }
});

export const {
  setCredentials,
  removeCredentials,
  setLoginId,
  setResetToken,
  setCurrentUser
} = slice.actions;
export default slice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.User;
export const IsLoggedIn = (state: RootState) => {
  let token;
  if (!state.auth.IsLoggedIn) {
    if (typeof window === "undefined") {
      return false;
    }
    token = localStorage ? localStorage.getItem("CHID") : "";
  }
  return state.auth.IsLoggedIn || !!token;
};
export const isLoading = (state: RootState) => state.auth.IsLoading;
export const getLoginId = (state: RootState) => state.auth.LoginId;
export const getResetToken = (state: RootState) => state.auth.Token;
