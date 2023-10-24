import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';

const NumberFormUpdate = ({navigation, route}) => {
  const {params} = route;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      value: '',
    },
  });

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const category = categoryRepository.filterById(params.categoryId);
  const valueToUpdate = valuesCategoryRepository.filterById(params.id);

  const onSubmit = ({value}: {value: string}) => {
    console.log(value);
    if (category) {
      valuesCategoryRepository.update(valueToUpdate, stringToDouble(value));
      control._reset();
      navigation.navigate('resume');
    }
  };

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Modificar registro" />
        </>
      }>
      <Text style={styles.textTitle}>{category.value}</Text>
      <Text style={styles.text}>
        Ultimo valor: {valueToUpdate.value.toString()}
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

      {errors.value && <Text style={styles.text}>Revise los campos</Text>}

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