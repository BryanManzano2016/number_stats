import React from 'react';
import {View, Alert} from 'react-native';
import {Card, Text, IconButton, Appbar} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';

import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';

const History = ({navigation}) => {
  const categoryRepository = CategoryRepository();
  const categories = categoryRepository.filter(false);

  return (
    <Layout
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
      {categories.map(item => (
        <Card key={item._id} style={styles.card}>
          <Card.Content>
            <View style={styles.viewCol}>
              <Text style={styles.cardTitleText} variant="bodyLarge">
                {item.value}
              </Text>
              <View style={styles.viewCol}>
                <IconButton
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
      {isEmpty(categories) && (
        <View style={styles.view}>
          <Text style={styles.text}>Sin elementos</Text>
        </View>
      )}
    </Layout>
  );
};

export default History;
