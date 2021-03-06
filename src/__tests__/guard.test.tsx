import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { FlagGuard, FlagProvider } from "../flag-poles";
const wrapper = ({ flag, providerValue }) => (
  <FlagProvider value={providerValue}>
    <FlagGuard flag={flag}>
      <div>Im a flagpole</div>
    </FlagGuard>
  </FlagProvider>
);
describe("FlagGuard", () => {
  it("throws an error if used outside of FlagProvider", () => {
    // Spy console to avoid jsdom warning on uncaught error
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation();

    const wrapperWithoutContext = (
      <FlagGuard flag="someFlag">
        <div>Im a flagpole</div>
      </FlagGuard>
    );
    expect(() => {
      render(wrapperWithoutContext);
    }).toThrowError("FlagGuard must be used within a FlagProvider");
    spy.mockRestore();
  });

  it.each([
    ["hides", "enabled: false", { no_render: { enabled: false } }, null],
    ["hides", "undefined", {}, null],
    ["shows", "enabled: true", { no_render: { enabled: true } }, true],
  ])("%s a child component when flag is %s", async (_, __, flags, result) => {
    act(() => {
      render(wrapper({ flag: "no_render", providerValue: { flags } }));
    });
    if (!result) {
      await waitFor(() =>
        expect(screen.queryByText("Im a flagpole")).toBeFalsy()
      );
    } else {
      await waitFor(() =>
        expect(screen.queryByText("Im a flagpole")).toMatchInlineSnapshot(`
              <div>
                Im a flagpole
              </div>
            `)
      );
    }
  });
});
