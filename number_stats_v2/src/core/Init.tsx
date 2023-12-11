import {DB_ENCRYPT_KEY} from '../utils/Constants';
import {generateKeyInt8, int8ArrayToString} from '../utils/Utilities';
import {cacheGetItem, cacheSetItem} from './SimpleStorage';

export const initApp = () => {
  const actualKeyDbValue = cacheGetItem(DB_ENCRYPT_KEY);
  if (['', undefined].includes(actualKeyDbValue)) {
    const keyDb = int8ArrayToString(generateKeyInt8());
    cacheSetItem(DB_ENCRYPT_KEY, keyDb);
  }
};
