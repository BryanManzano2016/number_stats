import React from 'react';
import {get as getOrDefault} from 'lodash';
import {Text} from 'react-native-paper';
import styles from '../styles/Main';
import {ButtonComponent} from '../components/ButtonComponent';

export const evaluateError = (errors: object, path: string) => {
  const messageError = getOrDefault(errors, path, '');
  return (
    <>
      {messageError ? <Text style={styles.text}>{messageError}</Text> : <></>}
    </>
  );
};

export const showCreateCategory = (
  navigation: any,
  redirect: string = 'home',
) => {
  return (
    <>
      <Text style={styles.text}>No tiene categorias registradas</Text>
      <ButtonComponent
        mode="contained"
        text="Crear categoria"
        onPress={() => {
          navigation.navigate('categories/new', {redirect: redirect});
        }}
      />
    </>
  );
};

export const showCreateRecord = (navigation: any) => {
  return (
    <>
      <Text style={styles.cardText}>Sin registros</Text>
      <ButtonComponent
        mode="contained"
        text="Agregar registro"
        onPress={() => {
          navigation.navigate('numbers');
        }}
      />
    </>
  );
};
