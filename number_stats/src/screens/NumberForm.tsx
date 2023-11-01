import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {get as getOrDefault} from 'lodash';

const NumberForm = ({navigation}) => {
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
            'El valor debe ser formato #.#',
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

  useEffect(() => {
    setSelectedCategory(defaultCategory?._id);
  }, [defaultCategory]);

  const onSubmit = ({value}: {value: string}) => {
    if (selectedCategory) {
      const recordDb = categories.filter(
        item => item._id === selectedCategory,
      )[0];
      const listDoubles = value.split(',').map(item => stringToDouble(item, 4));
      valuesCategoryRepository.saveBulk(recordDb._id, listDoubles);
      control._reset();
      setSelectedCategory(defaultCategory?._id);
      navigation.navigate('resume');
    }
  };

  const messageErrorValue = getOrDefault(errors, 'value.message', '');

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Registro" />
        </>
      }>
      {isEmpty(categories) ? (
        <Text style={styles.text}>No tiene categorias para registrar</Text>
      ) : (
        <>
          <Text style={styles.textTitle}>Seleccione una categoria</Text>
          <View style={styles.view}>
            <Picker
              style={styles.picker}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, _) => {
                setSelectedCategory(itemValue);
              }}>
              {categories.map(item => (
                <Picker.Item
                  key={item._id}
                  label={item.value}
                  value={item._id}
                />
              ))}
            </Picker>
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
