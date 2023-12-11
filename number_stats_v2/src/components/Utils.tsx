import Toast from 'react-native-toast-message';
import {cacheGetItem, cacheSetItem} from '../core/SimpleStorage';

export const printToast = () => {
  const toastMessage = cacheGetItem('toastMessage');
  const toastMessageType = cacheGetItem('toastMessageType');
  if (!['', undefined].includes(toastMessage)) {
    Toast.show({
      type: toastMessageType,
      text1: toastMessage,
    });
    cacheSetItem('toastMessage', '');
    cacheSetItem('toastMessageType', '');
  }
};
