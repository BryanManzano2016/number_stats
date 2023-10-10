import React from 'react';
import {Card, Text, Appbar} from 'react-native-paper';
import isEmpty from 'lodash/isEmpty';

import LineChart from '../components/LineChart';
import styles from '../styles/Main';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';

const Resume = ({navigation}) => {
  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();

  const categories = categoryRepository.filter(false);

  console.log(categories);

  const groupValues = () => {
    const xData = new Map();
    const yData = new Map();
    categories.forEach(category => {
      const valuesDb = valuesCategoryRepository.getAllByIdCategory(
        category._id,
      );

      const startRecords = Math.max(valuesDb.length - 12, 0);
      const itemsOrderFinal = valuesDb.slice(startRecords);

      const xValuesData: number[] = [];
      const yValuesData: number[] = [];

      itemsOrderFinal.forEach((values, index) => {
        if (values.idCategory === category._id) {
          xValuesData.push(index);
          yValuesData.push(values.value);
        }
      });
      xData.set(category._id, xValuesData);
      yData.set(category._id, yValuesData);
    });
    return {xData, yData};
  };

  const data = groupValues();

  return (
    <Layout
      headers={
        <>
          <Appbar.Content title="Resumen" />
        </>
      }>
      {isEmpty(categories) && (
        <Text style={styles.text}>Sin datos para mostrar</Text>
      )}
      {categories.map(category => {
        const yValues = data.yData.get(category._id);
        const xValues = data.xData.get(category._id);
        return (
          <Card style={styles.card} key={category._id}>
            <Card.Content>
              {!isEmpty(yValues) ? (
                <>
                  <Text variant="titleLarge" style={styles.cardText}>
                    {category.value}
                  </Text>
                  <LineChart dataValues={yValues} dataLabels={xValues} />
                </>
              ) : (
                <Text style={styles.cardText}>
                  Sin datos para {category.value}
                </Text>
              )}
            </Card.Content>
          </Card>
        );
      })}
    </Layout>
  );
};

export default Resume;
