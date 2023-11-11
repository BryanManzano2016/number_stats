import {Linking, Alert} from 'react-native';

export const openLink = (url: string) => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert('Error', `No se puede manejar la URL: ${url}`);
      }
    })
    .catch(err =>
      console.error('Ocurrió un error al intentar abrir la URL', err),
    );
};
