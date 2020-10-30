import React from "react";

import { FlagContext } from "./context";
interface FlagGuardProps {
  flag: string;
}

const FlagGuard: React.FC<FlagGuardProps> = ({ flag, children }) => {
  const context = React.useContext(FlagContext);
  if (context === undefined) {
    throw new Error("FlagGuard must be used within a FlagProvider");
  }
  const { checkFlag, user } = context;
  const checkedFlag = React.useMemo(() => checkFlag(flag, user), [
    flag,
    user,
    checkFlag,
  ]);
  if (checkedFlag) {
    return <> {children}</>;
  } else {
    return null;
  }
};
export default FlagGuard;
