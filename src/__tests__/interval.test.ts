import { renderHook } from "@testing-library/react-hooks";
import { useInterval } from "../flag-poles";
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
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
