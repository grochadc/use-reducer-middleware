# useReducerMiddleware

This is a custom hook that extends native react `useReducer` to take middleware as its third argument.

## Usage

```javascript
const middleware = [
  (store) => (next) => (action) => {
    //store is the tuple returned by useReducer
    const [state, dispatch] = store;

    //Do something when an action is dispatched
    console.log("Action dispatched ", action);

    //pass the action to the next middleware (action can be modified before passing it)
    return next(action);
  },
];
const { state, dispatch } = useReducerMiddleware(
  reducer,
  initialValues,
  middleware
);
```

The way middleware should be written in this package is similar to [redux's](http://redux.js.org) own middleware [implementation](https://redux.js.org/understanding/history-and-design/middleware#the-final-approach).
