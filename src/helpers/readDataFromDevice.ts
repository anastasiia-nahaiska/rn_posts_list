import { FileSystem } from 'react-native-file-access';

export const getDataFromDevice = async (path: string): Promise<any> => {
  const isFileExist = await FileSystem.exists(path);

  if (!isFileExist) {
    return;
  }

  const dataInJSON = await FileSystem.readFile(path);
  const data = JSON.parse(dataInJSON);

  return data;
};
