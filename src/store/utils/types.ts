import { Store } from "redux";

export type SagaInjectorDescriptor = {
  saga?: Function;
  mode?: string;
  task?: any;
};

export type SagaInjectedStore = {
  injectedSagas: Record<string, SagaInjectorDescriptor | "done">;
  runSaga: Function;
}
export type ReducerInjectedStore ={
  injectedReducers: Record<string, Function>;
  replaceReducer: Function;
};

export type InjectedStore<T> =  Store<T> & SagaInjectedStore & ReducerInjectedStore;

export type InjectSagaOption = { key: string; saga: Function; mode?: string };

export type InjectReducerOption = { key: string; reducer: Function };