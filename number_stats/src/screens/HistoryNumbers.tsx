import React, {useState, useMemo, useEffect, useRef} from 'react';
import {View, Alert} from 'react-native';
import {Card, Text, IconButton, Appbar} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';
import getOrDefaut from 'lodash/get';
import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import {formatDate} from '../utils/Format';
import SearchSelector from '../components/SearchSelector';
import Toast from 'react-native-toast-message';
import {OptionSelector} from '../types/OptionSelector';
import SelectDropdown from 'react-native-select-dropdown';
import {resetDropdown} from './Utils';

const History = ({navigation, route}) => {
  console.log('History...');

  const dropdownRef = useRef<SelectDropdown>(null);

  const valuesCategoryRepository = ValuesCategoryRepository();
  const categoryRepository = CategoryRepository();

  const categories = categoryRepository.filter(false);

  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >();

  const setCategory = (value: string) => {
    setSelectedCategorySelector(
      categoryRepository.toObject(categoryRepository.filterById(value ?? '')),
    );
  };

  useEffect(
    () =>
      resetDropdown(
        categories,
        selectedCategorySelector,
        setSelectedCategorySelector,
        dropdownRef,
      ),
    [categories, selectedCategorySelector, categoryRepository],
  );

  const data = useMemo(() => {
    if (selectedCategorySelector) {
      return valuesCategoryRepository.getAllByIdCategory(
        selectedCategorySelector.value,
        false,
      );
    }
    return [];
  }, [selectedCategorySelector, valuesCategoryRepository]);

  return (
    <Layout route={route} headers={<Appbar.Content title="Historial" />}>
      {isEmpty(categories) ? (
        <Text style={styles.text}>No tiene categorias registradas</Text>
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
                setCategory(selectedItem.value);
              }}
              defaultValue={selectedCategorySelector}
              dropdownRef={dropdownRef}
              defaultLabel="Ingrese un texto"
            />
          </View>
          {selectedCategorySelector && !isEmpty(data) ? (
            data.map(item => {
              const createtAt = getOrDefaut(item, 'createdAt', 0);
              const dateValue = formatDate(new Date(createtAt), 'FULL');
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
                                    Toast.show({
                                      type: 'success',
                                      text1: 'Registro eliminado',
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
                    <Text variant="titleMedium">{item.value}</Text>
                  </Card.Content>
                </Card>
              );
            })
          ) : (
            <Text style={styles.textTitle}>Sin datos</Text>
          )}
        </>
      )}
    </Layout>
  );
};

export default History;
