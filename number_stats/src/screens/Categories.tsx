import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Card, Text, IconButton, Appbar} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';

import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import Toast from 'react-native-toast-message';

const History = ({navigation, route}) => {
  const {params} = route;

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const categories = categoryRepository.filter(false);

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.Content title="Lista de categorias" />
          <Appbar.Action
            icon="plus-circle"
            onPress={() => {
              navigation.navigate('categories/new');
            }}
          />
        </>
      }>
      {isEmpty(categories) && (
        <Text style={styles.text}>No tiene categorias registradas</Text>
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
                      'Eliminar registro',
                      '¿Desea continuar?',
                      [
                        {
                          text: 'Si',
                          onPress: () => {
                            valuesCategoryRepository.deleteByIdCategory(
                              item._id,
                            );
                            categoryRepository.deleteRecord(item);
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
