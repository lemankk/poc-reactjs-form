import invariant from "invariant";
import { isEmpty, isFunction, isString, conformsTo, isArray } from "lodash";

import checkStore from "./checkStore";
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from "./constants";
import { InjectedStore, SagaInjectorDescriptor } from "./types";

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key: string) =>
  invariant(
    isString(key) && !isEmpty(key),
    "injectSaga: Expected `key` to be a non empty string"
  );

const checkDescriptor = (key: string, descriptor: SagaInjectorDescriptor) => {
  const shape = {
    saga: (saga: any) => isFunction(saga) || isArray(saga),
    mode: (mode: string) => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    `injectSaga(${key}): Expected a valid saga descriptor`
  );
};

export function injectSagaFactory<T = any>(
  store: InjectedStore<T>,
  isValid: boolean
) {
  return function injectSaga<P = any>(
    key: string,
    descriptor: SagaInjectorDescriptor = {},
    props?: P
  ) {
    if (!isValid) checkStore(store);

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON,
    };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(key, newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== "production") {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor !== "done" && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, props),
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

export function ejectSagaFactory<T = any>(
  store: InjectedStore<T>,
  isValid: boolean
) {
  return function ejectSaga(key: string) {
    if (!isValid) checkStore(store);

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (
        descriptor !== "done" &&
        descriptor.mode &&
        descriptor.mode !== DAEMON
      ) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === "production") {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = "done"; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors<T = any>(store: InjectedStore<T>) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
