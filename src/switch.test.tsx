import React from "react";
import { render, screen } from "@testing-library/react";
import { FlagSwitch } from "./switch";
import { FlagProvider } from "./context";
const wrapper = ({ flag, providerValue, children }) => (
  <FlagProvider value={providerValue}>
    <FlagSwitch flag={flag}>{children}</FlagSwitch>
  </FlagProvider>
);
describe("Switch", () => {
  it("throws an error if used outside of FlagProvider", () => {
    // Spy console to avoid jsdom warning on uncaught error
    const spy = jest.spyOn(console, "error");
    spy.mockImplementation();

    const wrapperWithoutContext = (
      <FlagSwitch flag="someFlag">
        <div>Im a flagpole</div>
      </FlagSwitch>
    );
    expect(() => render(wrapperWithoutContext)).toThrowError(
      "FlagSwitch needs to be used within a FlagProvider"
    );
    spy.mockRestore();
  });

  it.each([
    ["FlagSwitch.On", () => <FlagSwitch.On></FlagSwitch.On>],
    ["FlagSwitch.Off", () => <FlagSwitch.Off></FlagSwitch.Off>],
  ])(
    "throws an error if %s used outside of FlagSwitch context",
    (name, component) => {
      const spy = jest.spyOn(console, "error");
      spy.mockImplementation();
      expect(() => render(component())).toThrowError(
        `${name} needs to be used within a FlagProvider`
      );
      spy.mockRestore();
    }
  );
});
