import { renderHook, act } from "@testing-library/react-hooks";
import { useReducerMiddleware } from "../index";
import { reducer, middleware, logString, incrementAction } from "./utils";

test("It renders with correct initialValue", () => {
  const { result } = renderHook(() =>
    useReducerMiddleware(reducer, 0, undefined)
  );

  expect(result.current.state).toBe(0);
  expect(typeof result.current.dispatch).toBe("function");
});

test("It returns the correct state upon action dispatch", () => {
  const { result } = renderHook(() =>
    useReducerMiddleware(reducer, 0, undefined)
  );

  act(() => {
    result.current.dispatch(incrementAction());
  });

  expect(result.current.state).toBe(1);
});

test("It logs to the console from middleware", () => {
  console.log = jest.fn();
  const { result } = renderHook(() =>
    useReducerMiddleware(reducer, 0, middleware)
  );
  act(() => {
    result.current.dispatch(incrementAction());
  });
  expect(console.log).toHaveBeenCalledWith(logString);
});
