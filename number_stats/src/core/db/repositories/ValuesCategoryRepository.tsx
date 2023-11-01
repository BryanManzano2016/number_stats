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

  const saveBulk = (idCategory: string, values: number[]) => {
    realm.write(() => {
      let index = 0;
      for (const value of values) {
        const date = new Date(new Date().getTime() + index * 1000);
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
    const recordsFilter = filter(false).filter(
      record => record.idCategory === idCategory,
    );
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

  const update = (values: ValuesCategory, value: number) => {
    realm.write(() => {
      values.value = value;
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

  const getAllByIdCategory = (idCategory: string) => {
    const records = data.filtered('idCategory == $0', idCategory);
    return records;
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
