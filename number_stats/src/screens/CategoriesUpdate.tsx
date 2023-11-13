import React from 'react';
import {useForm} from 'react-hook-form';
import {Button, Appbar} from 'react-native-paper';
import {Alert} from 'react-native';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import styles from '../styles/Main';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {setItems} from '../core/SimpleStorage';
import {useTranslation} from 'react-i18next';
import {replaceParams} from '../core/i18n/I18n';
import {evaluateError} from './Utils';

const CategoriesCreate = ({navigation, route}) => {
  const {t} = useTranslation();

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
          .max(50, t('categories.name.bigger'))
          .required(t('categories.name.required')),
      }),
    ),
  });

  const onSubmit = ({name}: {name: string}) => {
    const elementExists = categoryRepository.filterByValue(name);
    if (elementExists === undefined) {
      setItems([
        {key: 'toastMessage', value: t('global.record.updated')},
        {key: 'toastMessageType', value: 'success'},
      ]);
      categoryRepository.update(element, name);
      navigation.navigate('categories');
    } else {
      Alert.alert(
        t('global.record.exists'),
        t('categories.name.other'),
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
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title={t('categories.update.title')} />
        </>
      }>
      <ControllerForm
        name="name"
        control={control}
        key={'name'}
        maxLength={30}
        placeHolder={replaceParams(t('categories.update.name.placeholder'), [
          ['value', element.value],
        ])}
        isRequired
        keyboardType="default"
        label={t('categories.update.name')}
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
