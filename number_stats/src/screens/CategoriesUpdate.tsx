import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import {Alert} from 'react-native';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import styles from '../styles/Main';

const CategoriesCreate = ({navigation, route}) => {
  const {params} = route;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const categoryRepository = CategoryRepository();
  const element = categoryRepository.filterById(params.id);

  const onSubmit = ({name}: {name: string}) => {
    const elementExists = categoryRepository.filterByValue(name);
    if (elementExists === undefined) {
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

  return (
    <Layout
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

      {errors.name && <Text style={styles.text}>Revise los campos</Text>}

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Guardar
      </Button>
    </Layout>
  );
};

export default CategoriesCreate;
