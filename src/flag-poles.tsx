import * as React from "react";
import "isomorphic-fetch";

import { Flag, FlagMap } from "./typings";
interface FlagContextProps {
  flags?: FlagMap;
  apiUrl?: string;
  checkFlag: (flagId: string, flags: FlagMap) => boolean;
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
  flags: {},
  checkFlag: (flagId: string, flags: Record<string, Partial<Flag>>) =>
    flags[flagId]?.enabled,
};
export const FlagContext = React.createContext<
  Partial<FlagContextProps> | undefined
>(undefined);
const fetchFlags = async (apiUrl) => {
  const operationsDoc = `
  query flags {
    flags {
      uid
      label
      enabled
    }
  }
`;
  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      query: operationsDoc,
      variables: {},
      operationName: "flags",
    }),
  });
};

export const useFlags = (
  value: FlagContextProps
): [FlagMap, React.Dispatch<React.SetStateAction<FlagMap>>] => {
  const [flags, setFlags] = React.useState({});
  const isMounted = React.useRef(false);
  const reduceFlags = (flags) =>
    flags.reduce((accum, flag) => ({ ...accum, [flag.uid]: flag }), {});
  React.useEffect(() => {
    isMounted.current = true;
    if (value.flags) {
      setFlags(value.flags);
    }
    if (value.apiUrl) {
      fetchFlags(value.apiUrl)
        .then((response) => response.json())
        .then(({ data: { flags = [] } }) => {
          if (isMounted.current)
            setFlags({ ...reduceFlags(flags), ...value.flags });
        });
    }
    return () => (isMounted.current = false);
  }, [flags, setFlags, value]);

  return [flags, setFlags];
};
export const FlagProvider: React.FC = ({
  value,
  children,
}: FlagProviderProps) => {
  const [flags] = useFlags(value);
  return (
    <FlagContext.Provider value={{ ...defaultOptions, flags }}>
      {children}
    </FlagContext.Provider>
  );
};

export const FlagGuard: React.FC<FlagGuardProps> = ({ flag, children }) => {
  const context = React.useContext(FlagContext);
  if (context === undefined) {
    throw new Error("FlagGuard must be used within a FlagProvider");
  }
  const { checkFlag, flags } = context;
  const checkedFlag = React.useMemo(() => checkFlag(flag, flags), [
    flag,
    flags,
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
  const { checkFlag, flags } = context;
  const checkedFlag = React.useMemo(() => checkFlag(flag, flags), [
    flag,
    flags,
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
