import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text} from 'react-native-paper';
import {View} from 'react-native';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
import {FORMAT_DATES, MAX_RECORDS_INSERT} from '../utils/Constants';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import SearchSelector from '../components/SearchSelector';
import Toast from 'react-native-toast-message';
import SelectDropdown from 'react-native-select-dropdown';
import {OptionSelector} from '../types/OptionSelector';
import {evaluateDropdown, evaluateError, showCreateCategory} from './Utils';
import {dateToString, isValidDateTime, stringToDate} from '../utils/Date';
import {useAppDispatch, useAppSelector} from '../store/Hooks';
import {setIdSelected} from '../store/Categories';

const NumberForm = ({route, navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      value: '',
      date: dateToString(new Date(), FORMAT_DATES.SIMPLE_DATE),
    },
    resolver: yupResolver(
      yup.object().shape({
        date: yup
          .string()
          .test(
            'is-valid-date',
            'Fecha debe ser dd/mm/aaaa hh:mm',
            function (value) {
              return isValidDateTime(value ?? '', FORMAT_DATES.SIMPLE_DATE);
            },
          ),
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
  const dispatch = useAppDispatch();

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const idSelectedGlobal = useAppSelector(state => state.categories.idSelected);

  const categories = categoryRepository.filter(false);

  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >(
    categoryRepository.toObject(
      categoryRepository.filterById(idSelectedGlobal ?? ''),
    ),
  );

  const setCategory = (value: string) => {
    setSelectedCategorySelector(
      categoryRepository.toObject(categoryRepository.filterById(value ?? '')),
    );
    dispatch(setIdSelected(value));
  };

  useEffect(() => {
    if (selectedCategorySelector?.value !== idSelectedGlobal) {
      setSelectedCategorySelector(
        categoryRepository.toObject(
          categoryRepository.filterById(idSelectedGlobal ?? ''),
        ),
      );
    }
  }, [categoryRepository, idSelectedGlobal, selectedCategorySelector]);

  const onSubmit = ({value, date}: {date?: string; value: string}) => {
    if (selectedCategorySelector) {
      const recordDb = categories.filter(
        item => item._id === selectedCategorySelector.value,
      )[0];
      const listDoubles = value.split(',').map(item => stringToDouble(item, 4));
      const dateSend = stringToDate(date) ?? new Date();
      valuesCategoryRepository.saveBulk(recordDb._id, listDoubles, dateSend);
      control._reset();
      Toast.show({
        type: 'success',
        text1: 'Registro creado',
      });
    }
  };

  return (
    <Layout route={route}>
      {isEmpty(categories) ? (
        showCreateCategory(navigation, 'numbers')
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

          <ControllerForm
            name="date"
            control={control}
            key={'date'}
            maxLength={16}
            placeHolder="dd/mm/aaaa hh:mm"
            isRequired
            keyboardType="numbers-and-punctuation"
            label="Fecha"
          />

          {evaluateError(errors, 'value.message')}
          {evaluateError(errors, 'date.message')}

          <Button
            style={styles.button}
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
