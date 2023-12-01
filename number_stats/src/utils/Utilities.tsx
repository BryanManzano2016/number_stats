import {t} from 'i18next';
import {Linking, Alert} from 'react-native';
import 'react-native-get-random-values';

export const openLink = (url: string) => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert('Error', t('tutorial.error.alert'));
      }
    })
    .catch(err =>
      console.error('Ocurrió un error al intentar abrir la URL', err),
    );
};

export const stringToInt8Array = (str: string): Int8Array => {
  const bytes = new Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return new Int8Array(bytes);
};

export const int8ArrayToString = (array: Int8Array): string => {
  return String.fromCharCode(...array);
};

export const generateKeyInt8 = (): Int8Array => {
  const keyLength = 64; // Longitud de la clave en bytes
  const key = new Int8Array(keyLength);
  crypto.getRandomValues(key); // Genera valores aleatorios seguros
  return key;
};
