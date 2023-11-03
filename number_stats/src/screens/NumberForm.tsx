import React, {useState, useEffect} from 'react';
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
import {setItems} from '../core/SimpleStorage';
import Toast from 'react-native-toast-message';

const NumberForm = ({navigation, route}) => {
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
              return currentLength > MAX_RECORDS_INSERT ? false : true;
            },
          )
          .required('Requerido'),
      }),
    ),
  });

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();

  const categories = categoryRepository.filter(false);

  const defaultCategory = isEmpty(categories) ? undefined : categories[0];

  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setSelectedCategory(defaultCategory?._id);
  }, [defaultCategory]);

  const onChangeDate = (value: Date) => {
    setDate(value);
  };

  const onSubmit = ({value}: {value: string}) => {
    if (selectedCategory) {
      const recordDb = categories.filter(
        item => item._id === selectedCategory,
      )[0];
      const listDoubles = value.split(',').map(item => stringToDouble(item, 4));
      valuesCategoryRepository.saveBulk(recordDb._id, listDoubles, date);
      control._reset();
      setSelectedCategory(defaultCategory?._id);
      setDate(new Date());
      Toast.show({
        type: 'success',
        text1: 'Registro creado',
      });
    }
  };

  const messageErrorValue = getOrDefault(errors, 'value.message', '');

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.Content title="Registro" />
        </>
      }>
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
            disabled={['', undefined].includes(selectedCategory)}
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
