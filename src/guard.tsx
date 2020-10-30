import React from "react";

import { FlagContext } from "./context";
interface FlagGuardProps {
  flag: string;
}

const FlagGuard: React.FC<FlagGuardProps> = ({ flag, children }) => {
  const { checkFlag, user } = React.useContext(FlagContext);
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
