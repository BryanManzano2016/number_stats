import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {get as getOrDefault} from 'lodash';
import {setItems} from '../core/SimpleStorage';
import {dateToString, isValidDateTime, stringToDate} from '../utils/Date';
import {FORMAT_DATES} from '../utils/Constants';
import {evaluateError} from './Utils';

const NumberFormUpdate = ({navigation, route}) => {
  const {params} = route;

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const category = categoryRepository.filterById(params.categoryId);
  const valueToUpdate = valuesCategoryRepository.filterById(params.id);

  const [date, setDate] = useState<Date>(new Date(valueToUpdate?.createdAt));

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      value: getOrDefault(valueToUpdate, 'value', '').toString(),
      date: dateToString(
        new Date(valueToUpdate?.createdAt),
        FORMAT_DATES.SIMPLE_DATE,
      ),
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
          .matches(/^-?\d+(\.\d+)?$/, 'El valor debe ser formato #.#')
          .required('Valor requerido'),
      }),
    ),
  });

  const onSubmit = ({value, date}: {value: string; date: string}) => {
    if (category) {
      setItems([
        {key: 'toastMessage', value: 'Registro modificado'},
        {key: 'toastMessageType', value: 'success'},
      ]);
      const dateSend = stringToDate(date);
      valuesCategoryRepository.update(
        valueToUpdate,
        stringToDouble(value, 4),
        (dateSend ?? new Date()).getTime(),
      );
      control._reset();
      navigation.navigate('history');
    }
  };

  return (
    <Layout
      route={route}
      headers={<Appbar.Content title="Modificar registro" />}>
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
        disabled={category === undefined}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Guardar
      </Button>
    </Layout>
  );
};

export default NumberFormUpdate;
