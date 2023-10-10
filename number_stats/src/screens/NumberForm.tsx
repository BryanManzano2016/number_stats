import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
import {PICKER_DEFAULT} from '../utils/Constants';
import isEmpty from 'lodash/isEmpty';

const NumberForm = ({navigation}) => {
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

  const categories = categoryRepository.filter(false);

  const [selectedCategory, setSelectedCategory] = useState(PICKER_DEFAULT);

  const onSubmit = ({value}: {value: string}) => {
    if (selectedCategory) {
      const recordDb = categories.filter(
        item => item._id === selectedCategory,
      )[0];
      valuesCategoryRepository.save(recordDb._id, stringToDouble(value));
      control._reset();
      setSelectedCategory(PICKER_DEFAULT);
      navigation.navigate('resume');
    }
  };

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Registro" />
        </>
      }>
      <Text style={styles.textTitle}>Seleccione una categoria</Text>

      <Picker
        style={styles.picker}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, _) => {
          setSelectedCategory(itemValue);
        }}>
        <Picker.Item
          key={PICKER_DEFAULT}
          label="Seleccione una categoria..."
          value={PICKER_DEFAULT}
        />
        {categories.map(item => (
          <Picker.Item key={item._id} label={item.value} value={item._id} />
        ))}
      </Picker>

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

      {errors.value && <Text style={styles.text}>Revise los campos</Text>}

      <Button
        disabled={
          [PICKER_DEFAULT, '', undefined].includes(selectedCategory) ||
          isEmpty(categories)
        }
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Guardar
      </Button>
    </Layout>
  );
};

export default NumberForm;
