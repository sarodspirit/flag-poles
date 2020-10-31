import * as React from "react";
import { Flag } from "./typings";

interface FlagProviderProps {
  value: Record<string, Partial<Flag>>;
  children?: React.Node;
}
const defaultOptions = {
  user: {},
  checkFlag: (flagId: string, flagMap: Record<string, Partial<Flag>>) =>
    flagMap[flagId]?.enabled,
};
export const FlagContext = React.createContext();
export const FlagProvider = ({ children, value }: FlagProviderProps) => {
  return (
    <FlagContext.Provider value={{ ...defaultOptions, ...value }}>
      {children}
    </FlagContext.Provider>
  );
};
