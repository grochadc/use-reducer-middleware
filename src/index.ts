import React from "react";
import * as R from "ramda";

export interface Action {
  type: string;
  payload: any;
}
export type State = any | undefined;
export interface Dispatch {
  (action: Action): any;
}
export type StoreAPI = [State, Dispatch | React.DispatchWithoutAction];

export interface Middleware {
  (storeAPI: StoreAPI): MiddlewareWithoutStore;
}

export interface MiddlewareWithoutStore {
  (next: (action: Action) => MiddlewareWithoutStore): (action: Action) => any;
}

export interface Reducer {
  (state: State, action: Action): State;
}

export interface UseReducerMiddleware {
  (reducer: Reducer, initialValue: State, middlewares?: Middleware[]): {
    state: State;
    dispatch: any;
  };
}

export const useReducerMiddleware: UseReducerMiddleware = (
  reducer,
  intialValue,
  middlewares
) => {
  const store: StoreAPI = React.useReducer(reducer, intialValue);
  const [state, dispatch] = store;

  if (middlewares === undefined) {
    return { state, dispatch };
  }
  const myChain = middlewares.map((middleware) => middleware(store));

  const composeArray = (arr: any[]) =>
    R.reduceRight(R.compose, R.identity, arr);

  const dispatchWithMiddleware = composeArray(myChain)(dispatch);

  return { state, dispatch: dispatchWithMiddleware };
};
