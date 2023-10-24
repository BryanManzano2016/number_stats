import React from 'react';
import {View, Alert} from 'react-native';
import {Card, Text, IconButton, Appbar} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';

import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';

const History = ({navigation}) => {
  const valuesCategoryRepository = ValuesCategoryRepository();
  const categoryRepository = CategoryRepository();

  const values = valuesCategoryRepository.filter();
  const categories = categoryRepository.filter(false);

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Historial" />
          <Appbar.Action
            icon="plus-circle"
            onPress={() => {
              navigation.navigate('categories/new');
            }}
          />
        </>
      }>
      {isEmpty(values) && <Text style={styles.text}>Sin elementos</Text>}
      {values.map(item => {
        const category = categories.filter(
          element => element._id === item.idCategory,
        )[0];
        return (
          <Card key={item._id} style={styles.card}>
            <Card.Content>
              <View style={styles.viewCol}>
                <Text style={styles.cardTitleText} variant="bodyLarge">
                  {item?.createdAt ? item?.createdAt.toLocaleString() : ''}
                </Text>
                <View style={styles.viewCol}>
                  <IconButton
                    icon="pencil"
                    size={25}
                    style={styles.iconButtonCol}
                    onPress={() => {
                      navigation.push('numbers/update', {
                        id: item._id,
                        categoryId: item.idCategory,
                      });
                    }}
                  />
                  <IconButton
                    icon="delete"
                    size={25}
                    style={styles.iconButtonCol}
                    onPress={() => {
                      Alert.alert(
                        'Eliminar registro',
                        '¿Desea continuar?',
                        [
                          {
                            text: 'Si',
                            onPress: () => {
                              valuesCategoryRepository.deleteRecord(item);
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
              <Text variant="bodyMedium">
                {item.value} en {category.value}
              </Text>
            </Card.Content>
          </Card>
        );
      })}
    </Layout>
  );
};

export default History;
