import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponseErrorPayloadAction } from "../../common/apiClient";
import { currenciesSliceKey, rootReducerKey } from "./constants";
import {
  BankCurrencyFetchPayload,
  BankCurrencyFetchSuccessPayload,
  BankCurrencyStates,
} from "./types";

export const bankCurrencyInitialStates: BankCurrencyStates = {
  currencies: [],
};

export const bankCurrencySlice = createSlice({
  name: `${rootReducerKey}/${currenciesSliceKey}`,
  initialState: bankCurrencyInitialStates,
  reducers: {
    reset: (state) => {
      state.status = undefined;
      state.currencies = [];
      state.error = undefined;
    },
    fetch: (state, action: PayloadAction<BankCurrencyFetchPayload>) => {
      state.status = "loading";
    },
    fetchSuccess: (
      state,
      action: PayloadAction<BankCurrencyFetchSuccessPayload>
    ) => {
      state.status = "completed";
      state.currencies = action.payload.data;
    },
    fetchError: (state, action: ApiResponseErrorPayloadAction) => {
      state.status = "error";
      state.error = action.payload.error;
    },
  },
});
