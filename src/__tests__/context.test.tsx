import React from "react";
import { render, screen, act } from "@testing-library/react";
import { rest } from "msw"; // msw supports graphql too!
import { setupServer } from "msw/node";
import { FlagGuard, FlagProvider } from "../flag-poles";
const server = setupServer(
  ...[
    rest.post("http://gimme/flags", async (req, res, ctx) => {
      return res(
        ctx.json({
          data: {
            flags: [
              { uid: "no_render", label: "No Render", enabled: false },
              { uid: "render", label: "Render", enabled: true },
            ],
          },
        })
      );
    }),
  ]
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const wrapper = ({ flag, providerValue }) => (
  <FlagProvider value={providerValue}>
    <FlagGuard flag={flag}>
      <div>Im a flagpole</div>
    </FlagGuard>
  </FlagProvider>
);
describe("FlagContext", () => {
  it("loads flags from context object", () => {
    render(
      wrapper({
        flag: "no_render",
        providerValue: { flags: { no_render: { enabled: true } } },
      })
    );
    expect(screen.queryByText("Im a flagpole")).toBeTruthy();
  });
  it("loads flags from api", () => {
    act(() => {
      render(
        wrapper({
          flag: "render",
          providerValue: { apiUrl: "http://gimme/flags" },
        })
      );
    });

    expect(screen.queryByText("Im a flagpole")).toBeTruthy();
  });
});
