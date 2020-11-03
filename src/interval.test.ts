import { renderHook } from "@testing-library/react-hooks";
import useInterval from "./interval";
jest.useFakeTimers();

describe("useInterval", () => {
  it("doesn't calls callback without delay", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));
    expect(callback).not.toHaveBeenCalled();
  });
  it("calls callback with delay", () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));
    jest.runOnlyPendingTimers();
    expect(callback).toBeCalled();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
