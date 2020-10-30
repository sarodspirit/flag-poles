import React from "react";
import { render, screen } from "@testing-library/react";
import FlagGuard from "./guard";
import { FlagProvider } from "./context";
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
    expect(() => render(wrapperWithoutContext)).toThrowError(
      "FlagGuard must be used within a FlagProvider"
    );
    spy.mockRestore();
  });

  it.each([
    ["hides", "enabled: false", { no_render: { enabled: false } }, null],
    ["hides", "undefined", {}, null],
    ["shows", "enabled: true", { no_render: { enabled: true } }, true],
  ])("%s a child component when flag is %s", (_, __, user, result) => {
    render(wrapper({ flag: "no_render", providerValue: { user } }));
    if (!result) {
      return expect(screen.queryByText("Im a flagpole")).toBeFalsy();
    }
    return expect(screen.queryByText("Im a flagpole")).toMatchInlineSnapshot(`
              <div>
                Im a flagpole
              </div>
            `);
  });
});
