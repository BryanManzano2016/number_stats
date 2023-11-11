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
import {setItems} from '../core/SimpleStorage';

const CategoriesCreate = ({navigation, route}) => {
  const {params} = route;

  const categoryRepository = CategoryRepository();
  const element = categoryRepository.filterById(params.id);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: element?.value,
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
        {key: 'toastMessage', value: 'Registro modificado'},
        {key: 'toastMessageType', value: 'success'},
      ]);
      categoryRepository.update(element, name);
      navigation.navigate('categories');
    } else {
      Alert.alert(
        'Registro existente',
        'Usar otro nombre',
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: true},
      );
    }
  };
  const messageErrorName = getOrDefault(errors, 'name.message', '');

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title="Editar categoria" />
        </>
      }>
      <ControllerForm
        name="name"
        control={control}
        key={'name'}
        maxLength={30}
        placeHolder={'Valor actual: '.concat(element.value)}
        isRequired
        keyboardType="default"
        label={'Nombre'}
      />

      {messageErrorName ? (
        <Text style={styles.text}>{messageErrorName}</Text>
      ) : (
        <></>
      )}

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
