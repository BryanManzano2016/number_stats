import React, {useState, useMemo, useEffect, useRef} from 'react';
import {View, Alert} from 'react-native';
import {Card, Text, IconButton, Divider} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';
import getOrDefaut from 'lodash/get';
import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import {formatDate, roundDoubleString} from '../utils/Format';
import SearchSelector from '../components/SearchSelector';
import Toast from 'react-native-toast-message';
import {OptionSelector} from '../types/OptionSelector';
import SelectDropdown from 'react-native-select-dropdown';
import {showCreateCategory, showCreateRecord} from './Utils';
import {useAppDispatch, useAppSelector} from '../store/Hooks';
import {categorySetIdSelected} from '../store/Categories';
import {useTranslation} from 'react-i18next';
import {DEFAULT_DECIMALS} from '../utils/Constants';

const History = ({navigation, route}) => {
  const {t} = useTranslation();

  const dropdownRef = useRef<SelectDropdown>(null);
  const dispatch = useAppDispatch();

  const valuesCategoryRepository = ValuesCategoryRepository();
  const categoryRepository = CategoryRepository();

  const categories = categoryRepository.filter(false);
  const idSelectedGlobal = useAppSelector(state => state.categories.idSelected);

  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >(categoryRepository.filterByIdObject(idSelectedGlobal ?? ''));

  const setCategory = (value: string) => {
    setSelectedCategorySelector(
      categoryRepository.filterByIdObject(value ?? ''),
    );
    dispatch(categorySetIdSelected(value));
  };

  useEffect(() => {
    if (selectedCategorySelector?.value !== idSelectedGlobal) {
      setSelectedCategorySelector(
        categoryRepository.filterByIdObject(idSelectedGlobal ?? ''),
      );
    }
  }, [categoryRepository, idSelectedGlobal, selectedCategorySelector]);

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
    <Layout route={route}>
      {isEmpty(categories) ? (
        <>{showCreateCategory(navigation, 'history')}</>
      ) : (
        <>
          <Text style={styles.textTitle}>{t('select.category')}</Text>
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
              defaultLabel={t('global.write.something')}
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
                              t('history.delete'),
                              t('history.delete.question'),
                              [
                                {
                                  text: t('global.yes'),
                                  onPress: () => {
                                    valuesCategoryRepository.deleteRecord(item);
                                    Toast.show({
                                      type: 'success',
                                      text1: t('global.record.deleted'),
                                    });
                                  },
                                },
                                {
                                  text: t('global.no'),
                                  onPress: () => {},
                                },
                              ],
                              {cancelable: true},
                            );
                          }}
                        />
                      </View>
                    </View>
                    <Text variant="titleMedium">
                      {roundDoubleString(item.value, DEFAULT_DECIMALS)}
                    </Text>
                  </Card.Content>
                </Card>
              );
            })
          ) : (
            <>
              <Divider style={styles.divider} bold />
              {showCreateRecord(navigation)}
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default History;
