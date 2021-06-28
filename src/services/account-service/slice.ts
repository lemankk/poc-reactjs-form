import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponseErrorPayloadAction } from "../../common/apiClient";
import { accountSliceKey, rootReducerKey } from "./constants";
import { BankAccountFetchPayload, BankAccountFetchSuccessPayload, BankAccountStates } from "./types";

export const bankAccountInitialStates: BankAccountStates = {
  accounts: [],
}

export const bankAccountSlice = createSlice({
  name: `${rootReducerKey}/${accountSliceKey}`,
  initialState: bankAccountInitialStates,
  reducers: {
    reset: ( state ) => {
      state.status  = undefined;
      state.accounts = [];
      state.error = undefined;
    },
    fetch: (state, action: PayloadAction<BankAccountFetchPayload>) => {
      state.status = "loading";

    },
    fetchSuccess: (state, action: PayloadAction<BankAccountFetchSuccessPayload>) => {
      state.status = "completed";
      state.accounts = action.payload.data;

    },
    fetchError: (state, action: ApiResponseErrorPayloadAction) => {
      state.status = "error";
      state.error = action.payload.error;
    },
  }
})
