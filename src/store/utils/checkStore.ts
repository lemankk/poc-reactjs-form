import { conformsTo, isFunction, isObject } from "lodash";
import invariant from "invariant";
import { InjectedStore } from "./types";

/**
 * Validate the shape of redux store
 */
export default function checkStore<T = any>(
  store: InjectedStore<T>
) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };
  invariant(
    conformsTo(store, shape as any),
    "injectors: Expected a valid redux store"
  );
}
