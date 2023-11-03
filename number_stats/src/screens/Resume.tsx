import React, {useState, useMemo, useEffect} from 'react';
import {Card, Text, Appbar} from 'react-native-paper';
import {View} from 'react-native';
import isEmpty from 'lodash/isEmpty';

import LineChart from '../components/LineChart';
import styles from '../styles/Main';
import {calculateAverage} from '../utils/Math';
import {roundDouble, formatDate} from '../utils/Format';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import SearchSelector from '../components/SearchSelector';

const Resume = ({route}) => {
  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();

  const categories = categoryRepository.filter(false);
  const defaultCategory = isEmpty(categories) ? undefined : categories[0];

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const categoryData = categoryRepository.filterById(selectedCategory ?? '');

  const setCategory = (value: string) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    setCategory(defaultCategory?._id ?? '');
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
      route={route}
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
            <SearchSelector
              options={categories.map(item => ({
                label: item.value,
                value: item._id,
              }))}
              onChange={selectedItem => {
                setCategory(selectedItem.value);
              }}
              defaultValue={
                defaultCategory
                  ? {
                      label: defaultCategory.value,
                      value: defaultCategory._id,
                    }
                  : undefined
              }
            />
          </View>
        </>
      )}

      {categoryData && (
        <Card style={styles.card} key={categoryData._id}>
          <Card.Content>
            {!isEmpty(data.yValuesData) ? (
              <>
                <Text variant="titleSmall" style={styles.cardText}>
                  Promedio {roundDouble(calculateAverage(data.yValuesData))} /{' '}
                  {data.yValuesData.length} registros
                </Text>
                {chart}
              </>
            ) : (
              <Text style={styles.cardText}>Sin datos</Text>
            )}
          </Card.Content>
        </Card>
      )}
    </Layout>
  );
};

export default Resume;
