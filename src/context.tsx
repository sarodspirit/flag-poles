import * as React from "react";

const defaultOptions = {
  user: {},
  checkFlag: (flag: string, user: any) => user[flag]?.enabled,
};
export const FlagContext = React.createContext();
export const FlagProvider: React.FC = ({
  children,
  value,
}: {
  value?: any;
  children?: React.Node;
}) => {
  return (
    <FlagContext.Provider value={{ ...defaultOptions, ...value }}>
      {children}
    </FlagContext.Provider>
  );
};
