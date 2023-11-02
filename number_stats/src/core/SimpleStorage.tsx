import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const containsKey = (key: string): boolean => {
  return storage.contains(key);
};

export const getAllKeys = (): string[] => {
  return storage.getAllKeys();
};

export const setItem = (key: string, value: string | number): void => {
  if (key === undefined) {
    return;
  }
  if (typeof value === 'number') {
    storage.set(key, value.toString());
  } else {
    storage.set(key, value);
  }
};

export const getItem = (key: string, defaultValue: string = ''): string => {
  return storage.getString(key) ?? defaultValue;
};

export const deleteItem = (key: string): void => {
  storage.delete(key);
};

export const clearAll = (): void => {
  storage.clearAll();
};

export const getItemAsNumber = (key: string): number | null => {
  const value = storage.getString(key);
  return value ? parseFloat(value) : null;
};
