import { combineReducers } from "redux";
import {
  currenciesSliceKey,
} from "./constants";
import { bankCurrencySlice } from "./slice";

export const reducers = combineReducers({
    [currenciesSliceKey]: bankCurrencySlice.reducer,
  });
