import React from "react";
const useInterval = (callback: () => void, delay: number | null): void => {
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
export default useInterval;
