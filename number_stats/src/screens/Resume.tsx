import React, {useState, useMemo, useEffect, useRef} from 'react';
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
import {OptionSelector} from '../types/OptionSelector';
import SelectDropdown from 'react-native-select-dropdown';

const Resume = ({route}) => {
  const dropdownRef = useRef<SelectDropdown>();

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();

  const categories = categoryRepository.filter(false);
  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >();
  const setCategory = (value: string) => {
    setSelectedCategorySelector(
      categoryRepository.toObject(categoryRepository.filterById(value ?? '')),
    );
  };

  useEffect(() => {
    const selected = [...categories].filter(
      item => item._id === selectedCategorySelector?.value,
    );
    console.log({selected});
    if (selectedCategorySelector !== undefined && isEmpty(selected)) {
      setSelectedCategorySelector(undefined);
      if (dropdownRef?.current) {
        dropdownRef.current.reset();
      }
    }
  }, [categories, selectedCategorySelector]);

  const data = useMemo(() => {
    try {
      if (selectedCategorySelector) {
        const valuesDb = valuesCategoryRepository.getAllByIdCategory(
          selectedCategorySelector.value,
          true,
        );

        const xValuesData: string[] = [];
        const yValuesData: number[] = [];

        valuesDb.forEach(values => {
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
  }, [selectedCategorySelector, valuesCategoryRepository]);

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

  console.log(selectedCategorySelector);

  return (
    <Layout route={route} headers={<Appbar.Content title="Resumen" />}>
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
              defaultValue={selectedCategorySelector}
              dropdownRef={dropdownRef}
            />
          </View>
        </>
      )}

      {selectedCategorySelector && (
        <Card style={styles.card} key={selectedCategorySelector.value}>
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
