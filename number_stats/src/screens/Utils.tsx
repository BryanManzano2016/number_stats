import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {OptionSelector} from '../types/OptionSelector';
import {isEmpty, get as getOrDefault} from 'lodash';
import Category from '../core/db/models/Category';
import {Results} from 'realm/dist/bundle';
import {setItem} from '../core/SimpleStorage';
import {Text} from 'react-native-paper';
import styles from '../styles/Main';
import {ButtonComponent} from '../components/ButtonComponent';

export const evaluateDropdown = (
  categories: Results<Category> | undefined,
  selectedCategorySelector: OptionSelector | undefined,
  setSelectedCategorySelector: React.Dispatch<
    React.SetStateAction<OptionSelector | undefined>
  >,
  dropdownRef: React.RefObject<SelectDropdown>,
) => {
  if (categories && selectedCategorySelector && dropdownRef) {
    const selectedList = [...categories].filter(
      item =>
        item._id === selectedCategorySelector?.value &&
        item.value === selectedCategorySelector?.label,
    );
    if (selectedCategorySelector !== undefined && isEmpty(selectedList)) {
      setSelectedCategorySelector(undefined);
      if (dropdownRef?.current) {
        dropdownRef.current.reset();
      }
    }
    if (!isEmpty(selectedList)) {
      setItem('idCategory', selectedList[0]._id);
    }
  }
};

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
      <Text style={styles.text}>No tiene categorias registradas</Text>
      <ButtonComponent
        mode="contained"
        text="Crear categoria"
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
        text="Agregar registro"
        onPress={() => {
          navigation.navigate('numbers');
        }}
      />
    </>
  );
};
