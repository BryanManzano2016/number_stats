import {useQuery, useRealm} from '@realm/react';
import ValuesCategory from '../models/ValuesCategory';
import {MAX_RECORDS} from '../../../utils/Constants';
import {isEmpty} from 'lodash';

const ValuesCategoryRepository = () => {
  const realm = useRealm();
  const data = useQuery(ValuesCategory);

  const save = (idCategory: string, value: number) => {
    realm.write(() => {
      return realm.create(
        'VALUES_CATEGORIES',
        ValuesCategory.generate(idCategory, value, new Date().getTime()),
      );
    });
  };

  const saveBulk = (idCategory: string, values: number[], dateValue: Date) => {
    if (
      idCategory === undefined ||
      isEmpty(values) ||
      dateValue === undefined
    ) {
      console.log('Error saveBulk');
      return;
    }
    depurateValues(idCategory, values.length);
    realm.write(() => {
      let index = 0;
      for (const value of values) {
        const date = new Date(dateValue.getTime() + index * 10);
        realm.create(
          'VALUES_CATEGORIES',
          ValuesCategory.generate(idCategory, value, date.getTime()),
        );
        index = index + 1;
      }
    });
  };

  const depurateValues = (idCategory: string, insertRecords: number) => {
    if (idCategory === undefined || insertRecords === undefined) {
      console.log('Error depurateValues');
      return;
    }
    const recordsFilter = getAllByIdCategory(idCategory, true);
    const itemsToDelete = !isEmpty(recordsFilter)
      ? recordsFilter.length + insertRecords - MAX_RECORDS
      : 0;
    if (itemsToDelete > 0) {
      realm.write(() => {
        for (let index = 0; index < itemsToDelete; index++) {
          const candidate = recordsFilter[index];
          if (candidate) {
            realm.delete(candidate);
          }
        }
      });
    }
  };

  const update = (values: ValuesCategory, value: number, date: Date) => {
    realm.write(() => {
      values.value = value;
      values.createdAt = date;
      return values;
    });
  };

  const filter = (orderDesc: boolean = true) => {
    return data.sorted([['createdAt', orderDesc]]);
  };

  const filterByValue = (value: string) => {
    return data.filtered('value == $0', value)[0];
  };

  const filterById = (id: string) => {
    return data.filtered('_id == $0', id)[0];
  };

  const deleteRecord = (element: ValuesCategory | undefined) => {
    realm.write(() => {
      realm.delete(element);
    });
  };

  const deleteByIdCategory = (idCategory: string) => {
    const records = data.filtered('idCategory == $0', idCategory);
    realm.write(() => {
      realm.delete(records);
    });
  };

  const getAllByIdCategory = (idCategory: string, ascOrder: boolean = true) => {
    const orderString = ascOrder ? 'ASC' : 'DESC';
    const dataByCategory = data.filtered(
      `idCategory == '${idCategory}' SORT(createdAt ${orderString})`,
    );
    return dataByCategory;
  };

  return {
    save,
    filter,
    filterById,
    deleteRecord,
    filterByValue,
    update,
    deleteByIdCategory,
    getAllByIdCategory,
    saveBulk,
  };
};

export default ValuesCategoryRepository;
