import React from "react";
import { render, screen } from "@testing-library/react";
import FlagSwitch from "./switch";
import { FlagProvider } from "./context";
const wrapper = ({ flag, providerValue, options }) => (
  <FlagProvider value={providerValue}>
    <FlagSwitch flag={flag}>
      <FlagSwitch.On>
        <div>{options.on}</div>
      </FlagSwitch.On>
      <FlagSwitch.Off>
        <div>{options.off}</div>
      </FlagSwitch.Off>
    </FlagSwitch>
  </FlagProvider>
);
describe("FlagSwitch", () => {
  it.each([
    ["FlagSwitch", () => <FlagSwitch flag="someFlag"></FlagSwitch>],
    ["FlagSwitch.On", () => <FlagSwitch.On></FlagSwitch.On>],
    ["FlagSwitch.Off", () => <FlagSwitch.Off></FlagSwitch.Off>],
  ])(
    "throws an error if %s used outside of FlagProvider",
    (name, component) => {
      const spy = jest.spyOn(console, "error");
      spy.mockImplementation();
      expect(() => render(component())).toThrowError(
        `${name} needs to be used within a FlagProvider`
      );
      spy.mockRestore();
    }
  );
  it.each([
    [
      "shows On",
      "enabled: true",
      { no_render: { enabled: true } },
      "Rock On",
      null,
    ],
    [
      "shows Off",
      "enabled: false",
      { no_render: { enabled: false } },
      null,
      "Rock Off",
    ],
  ])("%s branch if render is %s", (_, __, flagMap, on, off) => {
    render(
      wrapper({
        flag: "no_render",
        providerValue: { flagMap },
        options: { on, off },
      })
    );
    expect(screen.queryByText(on || off).textContent).toEqual(on || off);
  });
});
