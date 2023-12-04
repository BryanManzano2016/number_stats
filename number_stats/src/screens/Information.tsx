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
          <Appbar.Content title={t('information.drawer')} />
        </>
      }>
      <View style={styles.view}>
        <Text variant="titleLarge">
          {INFO_APP.NAME} {INFO_APP.VERSION}
        </Text>
        <Text style={styles.text} variant="bodyMedium">
          {i18nReplaceParams(t('app.description'), [
            ['app_name', INFO_APP.NAME],
          ])}
        </Text>
        <Text style={styles.text} variant="titleMedium">
          {t('information.consideration')}
        </Text>
        {i18nGetList('information.considerations.', 5).map((element, index) => {
          const keyText = `consideration.${index}`;
          return (
            <Text key={keyText} variant="bodyMedium">
              {element}
            </Text>
          );
        })}
        {/* <Text style={styles.text} variant="titleMedium">
          {t('information.tutorial')}
        </Text>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() =>
            openLink('https://www.youtube.com/watch?v=C0lo1oTa9Zs')
          }>
          {t('global.see')} youtube.com
        </Button> */}
      </View>
    </Layout>
  );
};

export default Information;
