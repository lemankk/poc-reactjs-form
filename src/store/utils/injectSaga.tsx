import React, { useContext } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { ReactReduxContext } from "react-redux";

import getInjectors from "./sagaInjectors";
import { InjectSagaOption } from "./types";

export const useInjectSaga = ({ key, saga, mode }: InjectSagaOption, props?: any) => {
  const context = useContext(ReactReduxContext);
  React.useEffect(() => {
    const injectors = getInjectors(context.store as any);
    injectors.injectSaga(key, { saga, mode }, props);

    return () => {
      injectors.ejectSaga(key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */


export function withInjectSaga<T = any>({ key, saga, mode }: InjectSagaOption) {
  return (WrappedComponent: React.ComponentType<T>) => {
    function InjectSaga(props: T) {
      useInjectSaga({ key, saga, mode }, props);

      return <WrappedComponent {...props} />;
    }
    InjectSaga.WrappedComponent = WrappedComponent;
    InjectSaga.displayName = `withSaga(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
}
