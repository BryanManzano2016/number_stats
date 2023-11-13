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
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';

const CategoriesCreate = ({navigation, route}) => {
  const {t} = useTranslation();

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
          .max(50, t('categories.name.bigger'))
          .required(t('categories.name.required')),
      }),
    ),
  });

  const onSubmit = ({name}: {name: string}) => {
    Keyboard.dismiss();
    const elementExists = categoryRepository.filterByValue(name);
    if (elementExists === undefined) {
      setItems([
        {key: 'toastMessage', value: t('global.record.created')},
        {key: 'toastMessageType', value: 'success'},
      ]);
      categoryRepository.save(name.trim());
      navigation.navigate(pathRedirect);
    } else {
      Toast.show({
        type: 'error',
        text1: t('categories.name.other'),
      });
    }
  };

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title={t('categories.create.title')} />
        </>
      }>
      <ControllerForm
        name="name"
        control={control}
        key={'name'}
        maxLength={30}
        placeHolder={t('categories.create.name.placeholder')}
        isRequired
        keyboardType="default"
        label={t('categories.create.name')}
      />

      {evaluateError(errors, 'name.message')}

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        {t('global.save')}
      </Button>
    </Layout>
  );
};

export default CategoriesCreate;
