import * as React from "react";
import { Flag, FlagMap } from "./typings";

interface FlagContextProps {
  flagMap: FlagMap;
  checkFlag: (flagId: string, flagMap: FlagMap) => boolean;
}
interface FlagProviderProps {
  children: React.ReactNode;
  value?: FlagContextProps;
}
interface FlagGuardProps {
  flag: string;
}

interface FlagSwitchComposition {
  On: React.FC;
  Off: React.FC;
}
interface FlagSwitchProps {
  flag: string;
  children?: React.ReactNode;
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

export const FlagGuard: React.FC<FlagGuardProps> = ({ flag, children }) => {
  const context = React.useContext(FlagContext);
  if (context === undefined) {
    throw new Error("FlagGuard must be used within a FlagProvider");
  }
  const { checkFlag, flagMap } = context;
  const checkedFlag = React.useMemo(() => checkFlag(flag, flagMap), [
    flag,
    flagMap,
    checkFlag,
  ]);
  if (checkedFlag) {
    return <> {children}</>;
  } else {
    return null;
  }
};

const FlagSwitchContext = React.createContext<
  { on: boolean; flag: string } | undefined
>(undefined);

export const FlagSwitch: React.FC<FlagSwitchProps> & FlagSwitchComposition = ({
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

export const useInterval = (
  callback: () => void,
  delay: number | null
): void => {
  const savedCallBack = React.useRef<() => void | null>();
  React.useEffect(() => {
    savedCallBack.current = callback;
  }, [savedCallBack, callback]);
  React.useEffect(() => {
    const handler = () => savedCallBack?.current();
    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
