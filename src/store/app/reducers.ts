import { combineReducers } from "redux";
import { languageSlice } from "./slices";

export const reducers = combineReducers({
  language: languageSlice.reducer,
});
