import React from 'react';
import {get as getOrDefault} from 'lodash';
import {Text} from 'react-native-paper';
import styles from '../styles/Main';
import {ButtonComponent} from '../components/ButtonComponent';
import {t} from 'i18next';

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
      <Text style={styles.text}>{t('categories.empty')}</Text>
      <ButtonComponent
        mode="contained"
        text={t('categories.create')}
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
        text={t('global.add.record')}
        onPress={() => {
          navigation.navigate('numbers');
        }}
      />
    </>
  );
};
