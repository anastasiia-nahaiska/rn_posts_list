import { createContext } from 'react';
import { NetInfo } from '../types/NetInfo';

export const NetInfoContext = createContext<NetInfo>({
  isConnected: false,
  setIsConnected: () => {},
});
