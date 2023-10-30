import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Text, Appbar} from 'react-native-paper';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Layout from '../components/Layout';
import ControllerForm from '../components/ControllerForm';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import styles from '../styles/Main';
import {stringToDouble} from '../utils/Format';
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

  const defaultCategory = isEmpty(categories) ? undefined : categories[0];

  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategory?._id,
  );

  const onSubmit = ({value}: {value: string}) => {
    if (selectedCategory) {
      const recordDb = categories.filter(
        item => item._id === selectedCategory,
      )[0];
      valuesCategoryRepository.save(recordDb._id, stringToDouble(value));
      control._reset();
      setSelectedCategory(defaultCategory?._id);
      navigation.navigate('resume');
    }
  };

  const generateTest = (id: string) => {
    for (let index = 0; index < 1000; index++) {
      valuesCategoryRepository.save(id, stringToDouble(index.toString()));
    }
  };

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Registro" />
        </>
      }>
      {isEmpty(categories) ? (
        <Text style={styles.text}>No tiene categorias para registrar</Text>
      ) : (
        <>
          <Text style={styles.textTitle}>Seleccione una categoria</Text>
          <View style={styles.view}>
            <Picker
              style={styles.picker}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, _) => {
                setSelectedCategory(itemValue);
              }}>
              {categories.map(item => (
                <Picker.Item
                  key={item._id}
                  label={item.value}
                  value={item._id}
                />
              ))}
            </Picker>
          </View>

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
            disabled={['', undefined].includes(selectedCategory)}
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </>
      )}
    </Layout>
  );
};

export default NumberForm;
