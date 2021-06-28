import { Store } from "redux";
import { InjectedStore } from "./types";

export function injectStore<T = any>(
  store: Store<T>,
  runSaga: Function
): InjectedStore<T> {
  return {
    ...store,

    // Extensions
    runSaga,
    injectedReducers: {}, // Reducer registry
    injectedSagas: {}, // Saga registry
  };
}
