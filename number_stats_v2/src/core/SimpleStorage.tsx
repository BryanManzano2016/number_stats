import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const cacheContainsKey = (key: string): boolean => {
  return storage.contains(key);
};

export const getAllKeys = (): string[] => {
  return storage.getAllKeys();
};

export const cacheSetItem = (
  key: string,
  value: string | number | boolean,
): void => {
  if (key === undefined) {
    return;
  }
  storage.set(key, value);
};

export const setItems = (items: any[]): void => {
  items.forEach(({key, value}) => {
    if (key === undefined) {
      return;
    }
    cacheSetItem(key, value);
  });
};

export const deleteItem = (key: string): void => {
  storage.delete(key);
};

export const clearAll = (): void => {
  storage.clearAll();
};

export const cacheGetItem = (
  key: string,
  defaultValue: string = '',
): string => {
  const value = storage.getString(key) ?? defaultValue;
  return value;
};

export const getItemAsNumber = (key: string): number | null => {
  const value = storage.getString(key);
  return value ? parseFloat(value) : null;
};

export const getItemAsBool = (key: string): boolean | undefined => {
  const value = storage.getBoolean(key);
  return value ?? undefined;
};
