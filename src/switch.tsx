import React, { ReactNode } from "react";
import { FlagContext } from "./context";

interface FlagSwitchComposition {
  On: React.FC;
  Off: React.FC;
}
interface FlagSwitchProps {
  flag: string;
  children?: ReactNode;
}
const FlagSwitchContext = React.createContext<
  { on: boolean; flag: string } | undefined
>(undefined);

const FlagSwitch: React.FC<FlagSwitchProps> & FlagSwitchComposition = ({
  flag,
  children,
}: FlagSwitchProps) => {
  const context = React.useContext(FlagContext);
  if (context === undefined) {
    throw new Error("FlagSwitch needs to be used within a FlagProvider");
  }
  const { checkFlag, flagMap } = context;
  const checkedFlag = React.useMemo(() => checkFlag(flag, flagMap), [
    flag,
    flagMap,
    checkFlag,
  ]);
  return (
    <FlagSwitchContext.Provider value={{ flag, on: checkedFlag }}>
      {children}
    </FlagSwitchContext.Provider>
  );
};

const On = ({ children }) => {
  const context = React.useContext(FlagSwitchContext);
  if (context === undefined) {
    throw new Error("FlagSwitch.On needs to be used within a FlagProvider");
  }
  const { on } = context;
  return on ? children : null;
};
const Off = ({ children }) => {
  const context = React.useContext(FlagSwitchContext);
  if (context === undefined) {
    throw new Error("FlagSwitch.Off needs to be used within a FlagProvider");
  }
  const { on } = context;
  return on ? null : children;
};

FlagSwitch.On = On;
FlagSwitch.Off = Off;
export default FlagSwitch;
