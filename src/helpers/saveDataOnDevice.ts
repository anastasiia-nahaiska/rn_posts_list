import { FileSystem } from 'react-native-file-access';

export const saveOnDevice = (path: string, data: any[]) => {
  FileSystem.writeFile(path, JSON.stringify(data));
};
