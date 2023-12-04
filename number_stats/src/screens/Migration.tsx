import React from 'react';
import {Text, Appbar} from 'react-native-paper';
import styles from '../styles/Main';
import Layout from '../components/Layout';
import {View} from 'react-native';
import {INFO_APP} from '../utils/Constants';
import {i18nGetList, i18nReplaceParams} from '../core/i18n/I18n';
import {useTranslation} from 'react-i18next';

const Information = ({navigation, route}) => {
  const {t} = useTranslation();

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title={t('migration.drawer')} />
        </>
      }>
      <View style={styles.view}>
        <Text variant="titleLarge">
          {INFO_APP.NAME} {INFO_APP.VERSION}
        </Text>
      </View>
    </Layout>
  );
};

export default Information;
