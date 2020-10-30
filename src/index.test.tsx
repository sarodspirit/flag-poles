import React from "react";
import { render } from "@testing-library/react";
import FlagGuard from "./guard";
import { FlagContext, FlagContextProvider } from "./context";
const wrapper = ({ flag }) => (
  <FlagContextProvider >
    <FlagGuard flag="flag-1">
      <div />
    </FlagGuard>
  </FlagContextProvider>
);
describe("ExampleComponent", () => {
  it("is truthy", () => {
    expect(render(wrapper({ flag: "no_render" })).toEqual(null);
  });
});
