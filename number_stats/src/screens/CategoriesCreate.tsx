import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Appbar} from 'react-native-paper';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import {setItems} from '../core/SimpleStorage';
import {evaluateError} from './Utils';
import {get} from 'lodash';
import styles from '../styles/Main';

const CategoriesCreate = ({navigation, route}) => {
  const pathRedirect = get(route, 'params.redirect', 'categories');
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
      setItems([
        {key: 'toastMessage', value: 'Registro creado'},
        {key: 'toastMessageType', value: 'success'},
      ]);
      categoryRepository.save(name);
      navigation.navigate(pathRedirect);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Usar otro nombre',
      });
    }
  };

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

      {evaluateError(errors, 'name.message')}

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Guardar
      </Button>
    </Layout>
  );
};

export default CategoriesCreate;
