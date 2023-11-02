import React, {useState, useMemo, useEffect} from 'react';
import {Card, Text, Appbar} from 'react-native-paper';
import {View} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import {Picker} from '@react-native-picker/picker';

import LineChart from '../components/LineChart';
import styles from '../styles/Main';
import {calculateAverage} from '../utils/Math';
import {roundDouble, formatDate} from '../utils/Format';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';

const Resume = ({navigation}) => {
  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();

  const categories = categoryRepository.filter(false);
  const defaultCategory = isEmpty(categories) ? undefined : categories[0];

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const categoryData = categoryRepository.filterById(selectedCategory ?? '');

  useEffect(() => {
    setSelectedCategory(defaultCategory?._id);
  }, [defaultCategory]);

  const data = useMemo(() => {
    try {
      if (categoryData) {
        const valuesDb = valuesCategoryRepository.getAllByIdCategory(
          categoryData._id,
          true,
        );

        const xValuesData: string[] = [];
        const yValuesData: number[] = [];

        valuesDb.forEach((values, index) => {
          xValuesData.push(
            formatDate(new Date(values.createdAt), 'DAY_YEAR_SHORT'),
          );
          yValuesData.push(values.value);
        });

        return {xValuesData, yValuesData};
      }
    } catch (error) {
      console.log('Error groupValues', error);
    }
    return {xValuesData: [], yValuesData: []};
  }, [categoryData, valuesCategoryRepository]);

  const chart = useMemo(() => {
    try {
      return (
        <LineChart
          dataValues={data.yValuesData}
          dataLabels={data.xValuesData}
          configuration={{
            heightProportional: 0.55,
            verticalLabelRotation: 75,
          }}
        />
      );
    } catch (error) {
      console.log('Error printChart', error);
    }
    return <></>;
  }, [data]);

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Resumen" />
        </>
      }>
      {isEmpty(categories) ? (
        <Text style={styles.text}>Sin datos para mostrar</Text>
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
        </>
      )}

      {categoryData && (
        <Card style={styles.card} key={categoryData._id}>
          <Card.Content>
            {!isEmpty(data.yValuesData) ? (
              <>
                <Text variant="titleLarge" style={styles.cardText}>
                  {categoryData.value}
                </Text>
                <Text variant="titleSmall" style={styles.cardText}>
                  Promedio {roundDouble(calculateAverage(data.yValuesData))} /{' '}
                  {data.yValuesData.length} registros
                </Text>
                {chart}
              </>
            ) : (
              <Text style={styles.cardText}>
                Sin datos para {categoryData.value}
              </Text>
            )}
          </Card.Content>
        </Card>
      )}
    </Layout>
  );
};

export default Resume;
