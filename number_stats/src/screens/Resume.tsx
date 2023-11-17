import React, {useState, useMemo, useEffect, useRef, Suspense} from 'react';
import {ActivityIndicator, Card, Divider, Text} from 'react-native-paper';
import {View} from 'react-native';
import isEmpty from 'lodash/isEmpty';

import LineChart from '../components/LineChart';
import styles from '../styles/Main';
import {calculateAverage} from '../utils/Math';
import {formatDate, roundDoubleString} from '../utils/Format';
import Layout from '../components/Layout';
import CategoryRepository from '../core/db/repositories/CategoryRepository';
import ValuesCategoryRepository from '../core/db/repositories/ValuesCategoryRepository';
import SearchSelector from '../components/SearchSelector';
import {OptionSelector} from '../types/OptionSelector';
import SelectDropdown from 'react-native-select-dropdown';
import {showCreateCategory, showCreateRecord} from './Utils';
import {useAppDispatch, useAppSelector} from '../store/Hooks';
import {categorySetIdSelected} from '../store/Categories';
import {useTranslation} from 'react-i18next';
import {i18nReplaceParams} from '../core/i18n/I18n';

const Resume = ({route, navigation}) => {
  const {t} = useTranslation();

  const dropdownRef = useRef<SelectDropdown>(null);
  const dispatch = useAppDispatch();

  const categoryRepository = CategoryRepository();
  const valuesCategoryRepository = ValuesCategoryRepository();

  const idSelectedGlobal = useAppSelector(state => state.categories.idSelected);
  const categories = categoryRepository.filter(false);
  const [selectedCategorySelector, setSelectedCategorySelector] = useState<
    OptionSelector | undefined
  >(categoryRepository.filterByIdObject(idSelectedGlobal ?? ''));

  const setCategory = (value: string) => {
    setSelectedCategorySelector(categoryRepository.filterByIdObject(value));
    dispatch(categorySetIdSelected(value));
  };

  useEffect(() => {
    if (selectedCategorySelector?.value !== idSelectedGlobal) {
      setSelectedCategorySelector(
        categoryRepository.filterByIdObject(idSelectedGlobal ?? ''),
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

        return {
          xValuesData,
          yValuesData,
          chart: (
            <LineChart
              dataValues={yValuesData}
              dataLabels={xValuesData}
              configuration={{
                heightProportional: 0.6,
                verticalLabelRotation: 75,
              }}
            />
          ),
        };
      }
    } catch (error) {
      console.log('Error groupValues', error);
    }
    return {
      xValuesData: [],
      yValuesData: [],
      chart: undefined,
    };
  }, [selectedCategorySelector, valuesCategoryRepository]);

  console.log('render resume', new Date());

  return (
    <Layout route={route}>
      {isEmpty(categories) ? (
        <>{showCreateCategory(navigation, 'resume')}</>
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
          <Suspense
            fallback={<ActivityIndicator size="large" color="#00ff00" />}>
            {selectedCategorySelector && !isEmpty(data.yValuesData) ? (
              <Card style={styles.card} key={selectedCategorySelector.value}>
                <Card.Content>
                  <>
                    <Text variant="titleSmall" style={styles.cardText}>
                      {i18nReplaceParams(t('resume.graph.title'), [
                        [
                          'mean',
                          roundDoubleString(calculateAverage(data.yValuesData)),
                        ],
                        ['records', data.yValuesData.length],
                      ])}
                    </Text>
                    {data.chart}
                  </>
                </Card.Content>
              </Card>
            ) : (
              <></>
            )}
          </Suspense>

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
