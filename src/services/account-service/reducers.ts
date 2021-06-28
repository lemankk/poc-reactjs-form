import { combineReducers } from "redux";
import {
  accountSliceKey,
} from "./constants";
import { bankAccountSlice } from "./slice";

export const reducers = combineReducers({
    [accountSliceKey]: bankAccountSlice.reducer,
  });