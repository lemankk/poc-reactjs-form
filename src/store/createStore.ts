import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import createRootReducers from "./reducers";
import { injectStore } from "./utils/injectStore";
export function createStore({ isDev = false, reducer: otherReducer = {} }) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware: any[] = [sagaMiddleware];

  const rootReducer = createRootReducers({ reducer: otherReducer});

  const tmpStore = configureStore({
    middleware,
    reducer: rootReducer,
    devTools: isDev,
  });

  const store = injectStore(tmpStore, sagaMiddleware.run);

  // Copying into injected reducer list
  Object.assign(store.injectedReducers, otherReducer);

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if ((module as any).hot) {
    (module as any).hot.accept("./reducers", () => {
      store.replaceReducer(createRootReducers({reducer: store.injectedReducers}));
    });
  }
  return { store };
}
