import { Reducer, StoreAPI, Action } from "./index";

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export const logString = "action dispatched";

export const middleware = [
  (store: StoreAPI) => (next: (action: Action) => any) => (action: Action) => {
    console.log(logString);
    return next(action);
  },
];

export const incrementAction = () => {
  return { type: "INCREMENT" };
};
