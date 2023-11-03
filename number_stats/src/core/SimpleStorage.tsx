import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const containsKey = (key: string): boolean => {
  return storage.contains(key);
};

export const getAllKeys = (): string[] => {
  return storage.getAllKeys();
};

export const setItem = (
  key: string,
  value: string | number | boolean,
): void => {
  if (key === undefined) {
    return;
  }
  storage.set(key, value);
};

export const deleteItem = (key: string): void => {
  storage.delete(key);
};

export const clearAll = (): void => {
  storage.clearAll();
};

export const getItem = (key: string, defaultValue: string = ''): string => {
  const value = storage.getString(key) ?? defaultValue;
  return value;
};

export const getItemAsNumber = (key: string): number | null => {
  const value = storage.getString(key);
  return value ? parseFloat(value) : null;
};

export const getItemAsBool = (key: string): boolean | undefined => {
  const value = storage.getBoolean(key);
  return value ? value : undefined;
};
