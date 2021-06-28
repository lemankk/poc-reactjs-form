import invariant from "invariant";
import { isEmpty, isFunction, isString } from "lodash";

import checkStore from "./checkStore";
import createRootReducer from "../reducers";
import { InjectedStore } from "./types";

export function injectReducerFactory<T = any>(
  store: InjectedStore<T>,
  isValid: boolean
) {
  return function injectReducer(key: string, reducer: Function) {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      "injectReducer: Expected `reducer` to be a reducer function"
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
    const newRootReducer = createRootReducer({ reducer: store.injectedReducers});
    store.replaceReducer(newRootReducer as any);
  };
}

export default function getInjectors<T = any>(store: InjectedStore<T>) {
  checkStore(store);

  return {
    injectReducer: injectReducerFactory(store, true),
  };
}
