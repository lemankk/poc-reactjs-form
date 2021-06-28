import { combineReducers } from "redux";
import {
  commonSliceKey,
  instructionSliceKey,
  previewSliceKey,
} from "./constants";
import { commonSlice, insturctionSlice, previewSlice } from "./slice";

export const reducers = combineReducers({
  [commonSliceKey]: commonSlice.reducer,
  [instructionSliceKey]: insturctionSlice.reducer,
  [previewSliceKey]: previewSlice.reducer,
});
