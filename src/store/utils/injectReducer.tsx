import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { ReactReduxContext } from "react-redux";

import getInjectors from "./reducerInjectors";
import { InjectReducerOption } from "./types";

export const useInjectReducer = ({ key, reducer }: InjectReducerOption) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store as any).injectReducer(key, reducer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export function withInjectReducer<T = any>({
  key,
  reducer,
}: InjectReducerOption) {
  return (WrappedComponent: React.ComponentType<T>) => {
    function ReducerInjector(props: T) {
      useInjectReducer({ key, reducer });

      return <WrappedComponent {...props} />;
    }
    ReducerInjector.WrappedComponent = WrappedComponent;
    ReducerInjector.displayName = `withReducer(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
}
