import * as React from "react";

const defaultOptions = {
  user: {},
  checkFlag: (flag: string, user: any) => user[flag]?.enabled,
};
export const FlagContext = React.createContext();
export const FlagContextProvider = ({ children }) => (
  <FlagContext.provider value={defaultOptions}>{children}</FlagContext.provider>
);
