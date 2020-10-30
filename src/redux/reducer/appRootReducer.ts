import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { firebaseReducer } from "react-redux-firebase";

import { initialErrorState } from "../state/AppState";

export interface ErrorPayload {
  error?: string;
  code?: number;
}

const errorStateSlice = createSlice({
  name: "errorState",
  initialState: initialErrorState,
  reducers: {
    clearError: (_) => initialErrorState,
    updateError: (_, { payload }: PayloadAction<ErrorPayload>) => payload,
  },
});

export const appRootReducer = combineReducers({
  firebase: firebaseReducer,
  error: errorStateSlice.reducer,
});
