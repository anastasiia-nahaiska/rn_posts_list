import React, { createContext, ReactNode, useState } from 'react';
import { ConnectingInfo } from '../types/ConnectionInfo';

export const ConnectionInfoContext = createContext<ConnectingInfo>({
  isConnected: false,
  setIsConnected: () => {},
});

type Props = {
  children: ReactNode;
};

export const ConnectionInfoContextProvider: React.FC<Props> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);

  const contextValues = {
    isConnected,
    setIsConnected,
  };

  return (
    <ConnectionInfoContext.Provider value={contextValues}>
      {children}
    </ConnectionInfoContext.Provider>
  );
};
