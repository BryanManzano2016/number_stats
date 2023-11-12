import React, {useState, useMemo, useEffect, useRef} from 'react';
import {Card, Divider, Text} from 'react-native-paper';
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
import {evaluateDropdown, showCreateCategory, showCreateRecord} from './Utils';
import {useAppDispatch, useAppSelector} from '../store/Hooks';
import {setIdSelected} from '../store/Categories';

const Resume = ({route, navigation}) => {
  const dropdownRef = useRef<SelectDropdown>(null);
  const dispatch = useAppDispatch();

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();

  const idSelectedGlobal = useAppSelector(state => state.categories.idSelected);
  const categories = categoryRepository.filter(false);
  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >(
    categoryRepository.toObject(
      categoryRepository.filterById(idSelectedGlobal ?? ''),
    ),
  );

  const setCategory = (value: string) => {
    setSelectedCategorySelector(
      categoryRepository.toObject(categoryRepository.filterById(value ?? '')),
    );
    dispatch(setIdSelected(value));
  };

  useEffect(() => {
    if (selectedCategorySelector?.value !== idSelectedGlobal) {
      setSelectedCategorySelector(
        categoryRepository.toObject(
          categoryRepository.filterById(idSelectedGlobal ?? ''),
        ),
      );
    }
  }, [categoryRepository, idSelectedGlobal, selectedCategorySelector]);

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

  return (
    <Layout route={route}>
      {isEmpty(categories) ? (
        <>{showCreateCategory(navigation, 'resume')}</>
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
              defaultLabel="Ingrese un texto"
            />
          </View>
          {selectedCategorySelector && !isEmpty(data.yValuesData) ? (
            <Card style={styles.card} key={selectedCategorySelector.value}>
              <Card.Content>
                <>
                  <Text variant="titleSmall" style={styles.cardText}>
                    Promedio {roundDouble(calculateAverage(data.yValuesData))} /{' '}
                    {data.yValuesData.length} registros
                  </Text>
                  {chart}
                </>
              </Card.Content>
            </Card>
          ) : (
            <></>
          )}

          {isEmpty(data.yValuesData) ? (
            <>
              <Divider style={styles.divider} bold />
              <View style={styles.view}>{showCreateRecord(navigation)}</View>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </Layout>
  );
};

export default Resume;
