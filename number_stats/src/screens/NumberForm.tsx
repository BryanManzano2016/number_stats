import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text} from 'react-native-paper';
import {Keyboard, View} from 'react-native';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
import {
  DEFAULT_DECIMALS,
  FORMAT_DATES,
  REGEX_PATTERNS,
} from '../utils/Constants';
import isEmpty from 'lodash/isEmpty';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import SearchSelector from '../components/SearchSelector';
import Toast from 'react-native-toast-message';
import SelectDropdown from 'react-native-select-dropdown';
import {OptionSelector} from '../types/OptionSelector';
import {evaluateError, showCreateCategory} from './Utils';
import {dateToString, isValidDateTime, stringToDate} from '../utils/Date';
import {useAppDispatch, useAppSelector} from '../store/Hooks';
import {setIdSelected} from '../store/Categories';
import {useTranslation} from 'react-i18next';

const NumberForm = ({route, navigation}) => {
  const {t} = useTranslation();

  const dropdownRef = useRef<SelectDropdown>(null);
  const dispatch = useAppDispatch();

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();
  const idSelectedGlobal = useAppSelector(state => state.categories.idSelected);

  const categories = categoryRepository.filter(false);

  const initialCategory = categoryRepository.filterByIdObject(
    idSelectedGlobal ?? '',
  );
  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >(initialCategory);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      category: initialCategory,
      value: '',
      date: dateToString(new Date(), FORMAT_DATES.SIMPLE_DATE),
    },
    resolver: yupResolver(
      yup.object().shape({
        category: yup
          .object()
          .test('test-category', t('numberForm.category.error'), function () {
            return (
              selectedCategorySelector !== undefined &&
              initialCategory !== undefined
            );
          }),
        date: yup
          .string()
          .test('is-valid-date', t('numberForm.date.error'), function (value) {
            return isValidDateTime(value ?? '', FORMAT_DATES.SIMPLE_DATE);
          }),
        value: yup
          .string()
          .matches(REGEX_PATTERNS.DECIMAL, t('numberForm.value.error'))
          .required(t('numberForm.value.required')),
      }),
    ),
  });

  const setCategory = (value: string) => {
    setSelectedCategorySelector(categoryRepository.filterByIdObject(value));
    dispatch(setIdSelected(value));
  };

  useEffect(() => {
    if (selectedCategorySelector?.value !== idSelectedGlobal) {
      setSelectedCategorySelector(
        categoryRepository.filterByIdObject(idSelectedGlobal ?? ''),
      );
    }
  }, [categoryRepository, idSelectedGlobal, selectedCategorySelector]);

  const onSubmit = ({value, date}: {date?: string; value: string}) => {
    Keyboard.dismiss();
    if (selectedCategorySelector) {
      const recordDb = categories.filter(
        item => item._id === selectedCategorySelector.value,
      )[0];
      const dateSend = stringToDate(date) ?? new Date();
      valuesCategoryRepository.saveBulk(
        recordDb._id,
        [stringToDouble(value, DEFAULT_DECIMALS)],
        dateSend,
      );
      control._reset();
      setValue('date', dateToString(new Date(), FORMAT_DATES.SIMPLE_DATE));
      Toast.show({
        type: 'success',
        text1: t('global.record.created'),
        onPress: () => {
          navigation.navigate('resume');
        },
      });
    }
  };

  return (
    <Layout route={route}>
      {isEmpty(categories) ? (
        showCreateCategory(navigation, 'numbers')
      ) : (
        <>
          <Text style={styles.textTitle}>{t('select.category')}</Text>
          <View style={styles.view}>
            <SearchSelector
              options={categories.map(item => ({
                label: item.value,
                value: item._id,
              }))}
              onChange={selectedItem => {
                setCategory(selectedItem.value);
              }}
              defaultValue={selectedCategorySelector}
              dropdownRef={dropdownRef}
              defaultLabel={t('global.write.something')}
            />
          </View>

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
          {evaluateError(errors, 'category.message')}

          <Button
            style={styles.button}
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
            {t('global.save')}
          </Button>
        </>
      )}
    </Layout>
  );
};

export default NumberForm;
