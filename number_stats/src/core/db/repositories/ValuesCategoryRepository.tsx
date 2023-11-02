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
        ValuesCategory.generate(idCategory, value, new Date()),
      );
    });
  };

  const saveBulk = (idCategory: string, values: number[], dateValue: Date) => {
    realm.write(() => {
      let index = 0;
      for (const value of values) {
        const date = new Date(dateValue.getTime() + index * 1000);
        realm.create(
          'VALUES_CATEGORIES',
          ValuesCategory.generate(idCategory, value, date),
        );
        index = index + 1;
      }
    });
    depurateValues(idCategory);
  };

  const depurateValues = (idCategory: string) => {
    const recordsFilter = getAllByIdCategory(idCategory, true);
    const itemsToDelete = !isEmpty(recordsFilter)
      ? recordsFilter.length - MAX_RECORDS
      : 0;
    if (itemsToDelete > 0) {
      realm.write(() => {
        for (let index = 0; index < itemsToDelete; index++) {
          realm.delete(recordsFilter[index]);
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
    const dataByCategory = data.filtered('idCategory == $0', idCategory);
    const dataSorder = dataByCategory.sorted([['createdAt', ascOrder]]);
    return dataSorder;
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
