import React from 'react';
import {useForm} from 'react-hook-form';
import {Appbar, Button, Text} from 'react-native-paper';
import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {roundDoubleString, stringToDouble} from '../utils/Format';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {get as getOrDefault} from 'lodash';
import {setItems} from '../core/SimpleStorage';
import {dateToString, isValidDateTime, stringToDate} from '../utils/Date';
import {
  DEFAULT_DECIMALS,
  FORMAT_DATES,
  REGEX_PATTERNS,
} from '../utils/Constants';
import {evaluateError} from './Utils';
import {useTranslation} from 'react-i18next';
import {i18nReplaceParams} from '../core/i18n/I18n';
import {Keyboard} from 'react-native';

const NumberFormUpdate = ({navigation, route}) => {
  const {t} = useTranslation();

  const {params} = route;

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const category = categoryRepository.filterById(params.categoryId);
  const valueToUpdate = valuesCategoryRepository.filterById(params.id);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      value: roundDoubleString(valueToUpdate.value),
      date: dateToString(
        new Date(valueToUpdate?.createdAt),
        FORMAT_DATES.SIMPLE_DATE,
      ),
    },
    resolver: yupResolver(
      yup.object().shape({
        date: yup
          .string()
          .test('is-valid-date', t('numberForm.date.error'), function (value) {
            return isValidDateTime(value ?? '', FORMAT_DATES.SIMPLE_DATE);
          }),
        value: yup
          .string()
          .matches(REGEX_PATTERNS.DECIMAL, t('numberForm.update.value.format'))
          .required(t('numberForm.value.required')),
      }),
    ),
  });

  const onSubmit = ({value, date}: {date?: string; value: string}) => {
    Keyboard.dismiss();
    if (category) {
      setItems([
        {key: 'toastMessage', value: t('global.record.updated')},
        {key: 'toastMessageType', value: 'success'},
      ]);
      const dateSend = stringToDate(date);
      valuesCategoryRepository.update(
        valueToUpdate,
        stringToDouble(value, DEFAULT_DECIMALS),
        (dateSend ?? new Date()).getTime(),
      );
      control._reset();
      navigation.navigate('history');
    }
  };

  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title={t('numberForm.update.title')} />
        </>
      }>
      <Text style={styles.textTitle}>
        {i18nReplaceParams(t('numberForm.update.category'), [
          ['name', category.value],
        ])}
      </Text>
      <Text style={styles.textTitle}>
        {i18nReplaceParams(t('numberForm.update.last'), [
          ['value', roundDoubleString(valueToUpdate.value)],
        ])}
      </Text>

      <ControllerForm
        name="value"
        control={control}
        key={'value'}
        maxLength={12}
        placeHolder={t('numberForm.value.placeholder')}
        isRequired
        keyboardType="numeric"
        label={t('numberForm.value')}
      />

      <ControllerForm
        name="date"
        control={control}
        key={'date'}
        maxLength={16}
        placeHolder={t('numberForm.date.placeholder')}
        isRequired
        keyboardType="numbers-and-punctuation"
        label={t('numberForm.date')}
      />

      {evaluateError(errors, 'value.message')}
      {evaluateError(errors, 'date.message')}

      <Button
        style={styles.button}
        disabled={category === undefined}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        {t('global.save')}
      </Button>
    </Layout>
  );
};

export default NumberFormUpdate;
