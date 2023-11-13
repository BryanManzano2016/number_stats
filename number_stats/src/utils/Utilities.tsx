import {t} from 'i18next';
import {Linking, Alert} from 'react-native';

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
