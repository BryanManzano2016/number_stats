import React, {useState, useMemo} from 'react';
import {Card, Text, Appbar} from 'react-native-paper';
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

  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategory?._id,
  );

  const categoryData = categoryRepository.filterById(selectedCategory ?? '');

  const data = useMemo(() => {
    try {
      if (categoryData) {
        const valuesDb = valuesCategoryRepository.getAllByIdCategory(
          categoryData._id,
        );

        const startRecords = Math.max(valuesDb.length - 250, 0);
        const itemsOrderFinal = valuesDb.slice(startRecords);

        const xValuesData: string[] = [];
        const yValuesData: number[] = [];

        itemsOrderFinal.forEach((values, index) => {
          if (values.idCategory === categoryData._id) {
            xValuesData.push(formatDate(values.createdAt, 'DAY'));
            yValuesData.push(values.value);
          }
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
          <Picker
            style={styles.picker}
            selectedValue={selectedCategory}
            onValueChange={(itemValue, _) => {
              setSelectedCategory(itemValue);
            }}>
            {categories.map(item => (
              <Picker.Item key={item._id} label={item.value} value={item._id} />
            ))}
          </Picker>
        </>
      )}

      {categoryData && (
        <Card style={styles.card} key={categoryData._id}>
          <Card.Content>
            {!isEmpty(data.yValuesData) ? (
              <>
                <Text variant="titleLarge" style={styles.cardText}>
                  {categoryData.value} / ~
                  {roundDouble(calculateAverage(data.yValuesData))}
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
