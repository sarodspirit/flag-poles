import * as React from "react";
import { Flag } from "./typings";

type FlagMap = Record<string, Partial<Flag>>;
interface FlagContextProps {
  flagMap: FlagMap;
  checkFlag: (flagId: string, flagMap: FlagMap) => boolean;
}
interface FlagProviderProps {
  children: React.ReactNode;
  value?: FlagContextProps;
}
const defaultOptions = {
  flagMap: {},
  checkFlag: (flagId: string, flagMap: Record<string, Partial<Flag>>) =>
    flagMap[flagId]?.enabled,
};
export const FlagContext = React.createContext<
  Partial<FlagContextProps> | undefined
>(undefined);
export const FlagProvider = ({ value, children }: FlagProviderProps) => {
  return (
    <FlagContext.Provider value={{ ...defaultOptions, ...value }}>
      {children}
    </FlagContext.Provider>
  );
};
