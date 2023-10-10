import {useQuery, useRealm} from '@realm/react';
import ValuesCategory from '../models/ValuesCategory';
import {ENTITIES_DB} from '../../../utils/Constants';

const ValuesCategoryRepository = () => {
  const realm = useRealm();
  const data = useQuery(ValuesCategory);

  const save = (idCategory: string, value: number) => {
    realm.write(() => {
      return realm.create(
        ENTITIES_DB.VALUES_CATEGORIES,
        ValuesCategory.generate(idCategory, value),
      );
    });
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
    return [...records].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
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
  };
};

export default ValuesCategoryRepository;
