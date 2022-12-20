import { createContext } from 'react';
import { ConnectingInfo } from '../types/ConnectionInfo';

export const ConnectionInfoContext = createContext<ConnectingInfo>({
  isConnected: false,
  setIsConnected: () => {},
});
