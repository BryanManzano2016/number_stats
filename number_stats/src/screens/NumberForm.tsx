import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import {View} from 'react-native';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
import {MAX_RECORDS_INSERT} from '../utils/Constants';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {get as getOrDefault} from 'lodash';
import DatePicker from '../components/DatePicker';
import SearchSelector from '../components/SearchSelector';
import Toast from 'react-native-toast-message';
import SelectDropdown from 'react-native-select-dropdown';
import {OptionSelector} from '../types/OptionSelector';
import {resetDropdown} from './Utils';

const NumberForm = ({route}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      value: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        value: yup
          .string()
          .matches(
            /^(-?\d+(\.\d+)?)(,-?\d+(\.\d+)?)*$/,
            'Solo numeros separados por coma (Ejm: 1.1,2,3,...)',
          )
          .test(
            'length-validator',
            `No mas de ${MAX_RECORDS_INSERT} registros`,
            function (value) {
              const currentLength = value ? value.split(',').length : 0;
              return currentLength < MAX_RECORDS_INSERT;
            },
          )
          .required('Requerido'),
      }),
    ),
  });
  const dropdownRef = useRef<SelectDropdown>(null);

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const categories = categoryRepository.filter(false);

  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >();
  const [date, setDate] = useState<Date>(new Date());

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
    [categories, selectedCategorySelector],
  );

  const onChangeDate = (value: Date) => {
    setDate(value);
  };

  const onSubmit = ({value}: {value: string}) => {
    if (selectedCategorySelector) {
      const recordDb = categories.filter(
        item => item._id === selectedCategorySelector.value,
      )[0];
      const listDoubles = value.split(',').map(item => stringToDouble(item, 4));
      valuesCategoryRepository.saveBulk(recordDb._id, listDoubles, date);
      control._reset();
      setDate(new Date());
      Toast.show({
        type: 'success',
        text1: 'Registro creado',
      });
    }
  };

  const messageErrorValue = getOrDefault(errors, 'value.message', '');

  return (
    <Layout route={route} headers={<Appbar.Content title="Registro" />}>
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

          <ControllerForm
            name="value"
            control={control}
            key={'value'}
            maxLength={12}
            placeHolder="0"
            isRequired
            keyboardType="numeric"
            label="Valor"
          />

          <Text style={styles.textTitle}>Seleccione una fecha</Text>
          <DatePicker date={date} onDateChange={onChangeDate} />

          {messageErrorValue ? (
            <Text style={styles.text}>{messageErrorValue}</Text>
          ) : (
            <></>
          )}

          <Button
            disabled={selectedCategorySelector === undefined}
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </>
      )}
    </Layout>
  );
};

export default NumberForm;
