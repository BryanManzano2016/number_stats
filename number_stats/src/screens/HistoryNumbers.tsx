import React, {useState, useMemo, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Card, Text, IconButton, Appbar} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';
import getOrDefaut from 'lodash/get';
import {Picker} from '@react-native-picker/picker';

import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import {formatDate} from '../utils/Format';
import SearchSelector from '../components/SearchSelector';

const History = ({navigation}) => {
  const valuesCategoryRepository = ValuesCategoryRepository();
  const categoryRepository = CategoryRepository();

  const categories = categoryRepository.filter(false);

  const defaultCategory = isEmpty(categories) ? undefined : categories[0];

  const [selectedCategory, setSelectedCategory] = useState<string>();

  useEffect(() => {
    setSelectedCategory(defaultCategory?._id);
  }, [defaultCategory]);

  const data = useMemo(() => {
    if (selectedCategory) {
      return valuesCategoryRepository.getAllByIdCategory(
        selectedCategory,
        false,
      );
    }
    return [];
  }, [selectedCategory, valuesCategoryRepository]);

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Historial" />
        </>
      }>
      {isEmpty(categories) ? (
        <>
          <Text style={styles.text}>No tiene categorias registradas</Text>
        </>
      ) : (
        <>
          <Text style={styles.textTitle}>Seleccione una categoria</Text>
          <View style={styles.view}>
            <SearchSelector
              options={categories.map(item => ({
                label: item.value,
                value: item._id,
              }))}
              onChange={selectedItem => {
                setSelectedCategory(selectedItem.value);
              }}
              defaultValue={
                defaultCategory
                  ? {
                      label: defaultCategory.value,
                      value: defaultCategory._id,
                    }
                  : undefined
              }
            />
          </View>
          {selectedCategory &&
            data.map(item => {
              const createtAt = getOrDefaut(item, 'createdAt', 0);
              const dateValue = formatDate(new Date(createtAt) as Date, 'FULL');
              return (
                <Card key={item._id} style={styles.card}>
                  <Card.Content>
                    <View style={styles.viewCol}>
                      <Text style={styles.cardText} variant="bodyLarge">
                        {dateValue}
                      </Text>
                      <View style={styles.viewCol}>
                        <IconButton
                          iconColor="gray"
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
                          iconColor="gray"
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
                    <Text variant="titleMedium">{item.value}</Text>
                  </Card.Content>
                </Card>
              );
            })}
        </>
      )}
    </Layout>
  );
};

export default History;
