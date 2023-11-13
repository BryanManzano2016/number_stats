import React from 'react';
import {View, Alert} from 'react-native';
import {Card, Text, IconButton, Appbar} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';

import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../store/Hooks';
import {setIdSelected} from '../store/Categories';
import {useTranslation} from 'react-i18next';

const History = ({navigation, route}) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const categories = categoryRepository.filter(false);

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title={t('categories.title')} />
          <Appbar.Action
            icon="plus-circle"
            onPress={() => {
              navigation.navigate('categories/new');
            }}
          />
        </>
      }>
      {isEmpty(categories) && (
        <Text style={styles.text}>{t('categories.no.data')}</Text>
      )}
      {categories.map(item => (
        <Card key={item._id} style={styles.card}>
          <Card.Content>
            <View style={styles.viewCol}>
              <Text variant="titleMedium">{item.value}</Text>
              <View style={styles.viewCol}>
                <IconButton
                  iconColor="gray"
                  icon="pencil"
                  size={25}
                  style={styles.iconButtonCol}
                  onPress={() => {
                    dispatch(setIdSelected(undefined));
                    navigation.push('categories/update', {
                      id: item._id,
                    });
                  }}
                />
                <IconButton
                  icon="delete"
                  iconColor="gray"
                  size={25}
                  style={styles.iconButtonCol}
                  onPress={() => {
                    Alert.alert(
                      t('categories.delete'),
                      t('categories.delete.question'),
                      [
                        {
                          text: 'Si',
                          onPress: () => {
                            dispatch(setIdSelected(undefined));
                            valuesCategoryRepository.deleteByIdCategory(
                              item._id,
                            );
                            categoryRepository.deleteRecord(item);
                            Toast.show({
                              type: 'success',
                              text1: t('global.record.deleted'),
                            });
                          },
                        },
                        {
                          text: 'No',
                          onPress: () => {},
                        },
                      ],
                      {cancelable: true},
                    );
                  }}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
    </Layout>
  );
};

export default History;
