import Toast from 'react-native-toast-message';
import {getItem, setItem} from '../core/SimpleStorage';

export const printToast = () => {
  const toastMessage = getItem('toastMessage');
  const toastMessageType = getItem('toastMessageType');
  if (!['', undefined].includes(toastMessage)) {
    Toast.show({
      type: toastMessageType,
      text1: toastMessage,
    });
    setItem('toastMessage', '');
    setItem('toastMessageType', '');
  }
};
