import {useQuery, useRealm} from '@realm/react';
import Category from '../models/Category';
import {ENTITIES_DB} from '../../../utils/Constants';

const CategoryRepository = () => {
  const realm = useRealm();
  const data = useQuery(Category);

  const save = (value: string) => {
    realm.write(() => {
      return realm.create(ENTITIES_DB.CATEGORIES, Category.generate(value));
    });
  };

  const update = (category: Category, value: string) => {
    realm.write(() => {
      category.value = value;
      return category;
    });
  };

  const filter = (orderDesc: boolean = true) => {
    return data.sorted([['value', orderDesc]]);
  };

  const filterByValue = (value: string) => {
    return data.filtered('value == $0', value)[0];
  };

  const filterById = (id: string) => {
    return data.filtered('_id == $0', id)[0];
  };

  const deleteRecord = (element: Category | undefined) => {
    realm.write(() => {
      realm.delete(element);
    });
  };

  return {save, filter, filterById, deleteRecord, filterByValue, update};
};

export default CategoryRepository;
