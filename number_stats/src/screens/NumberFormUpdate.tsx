import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import {View} from 'react-native';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {get as getOrDefault} from 'lodash';
import DatePicker from '../components/DatePicker';

const NumberFormUpdate = ({navigation, route}) => {
  const {params} = route;

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const category = categoryRepository.filterById(params.categoryId);
  const valueToUpdate = valuesCategoryRepository.filterById(params.id);

  const [date, setDate] = useState<Date>(new Date(valueToUpdate?.createdAt));

  const onChangeDate = (value: Date) => {
    setDate(value);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      value: getOrDefault(valueToUpdate, 'value', '').toString(),
    },
    resolver: yupResolver(
      yup.object().shape({
        value: yup
          .string()
          .matches(/^-?\d+(\.\d+)?$/, 'El valor debe ser formato #.#')
          .required('Valor requerido'),
      }),
    ),
  });

  const onSubmit = ({value}: {value: string}) => {
    if (category) {
      valuesCategoryRepository.update(
        valueToUpdate,
        stringToDouble(value, 4),
        date.getTime(),
      );
      control._reset();
      navigation.navigate('resume');
    }
  };

  const messageErrorValue = getOrDefault(errors, 'value.message', '');

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Modificar registro" />
        </>
      }>
      <Text style={styles.textTitle}>Categoria {category.value}</Text>
      <Text style={styles.textTitle}>
        Ultimo valor: {(valueToUpdate?.value ?? '').toString()}
      </Text>

      <ControllerForm
        name="value"
        control={control}
        key={'value'}
        maxLength={12}
        placeHolder={'0'}
        isRequired
        keyboardType="numeric"
        label="Valor"
      />

      <Text style={styles.textTitle}>Seleccione la fecha: </Text>

      <DatePicker date={date} onDateChange={onChangeDate} />

      {messageErrorValue ? (
        <Text style={styles.text}>{messageErrorValue}</Text>
      ) : (
        <></>
      )}

      <Button
        disabled={category === undefined}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Guardar
      </Button>
    </Layout>
  );
};

export default NumberFormUpdate;
