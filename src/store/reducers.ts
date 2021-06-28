import { combineReducers } from "redux";
import { reducers as app } from "./app/reducers";

export default function createRootReducers ({ reducer = {} }) {
  return combineReducers({
    app,
    ...reducer,
  });
};
