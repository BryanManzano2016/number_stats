import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import {Alert} from 'react-native';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import styles from '../styles/Main';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {get as getOrDefault} from 'lodash';
import Toast from 'react-native-toast-message';
import {setItem} from '../core/SimpleStorage';

const CategoriesCreate = ({navigation, route}) => {
  const categoryRepository = CategoryRepository();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup
          .string()
          .max(50, 'Nombre muy extenso')
          .required('Nombre requerido'),
      }),
    ),
  });

  const onSubmit = ({name}: {name: string}) => {
    const elementExists = categoryRepository.filterByValue(name);
    if (elementExists === undefined) {
      setItem('toastMessage', 'hi');
      categoryRepository.save(name);
      navigation.navigate('categories');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Usar otro nombre',
      });
    }
  };

  const messageErrorName = getOrDefault(errors, 'name.message', '');

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title="Crear categoria" />
        </>
      }>
      <ControllerForm
        name="name"
        control={control}
        key={'name'}
        maxLength={30}
        placeHolder="Nombre"
        isRequired
        keyboardType="default"
        label="Nombre"
      />

      {messageErrorName ? (
        <Text style={styles.text}>{messageErrorName}</Text>
      ) : (
        <></>
      )}

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Guardar
      </Button>
    </Layout>
  );
};

export default CategoriesCreate;
