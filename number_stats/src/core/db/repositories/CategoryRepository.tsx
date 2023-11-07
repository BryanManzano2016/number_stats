import {useQuery, useRealm} from '@realm/react';
import Category from '../models/Category';

const CategoryRepository = () => {
  const realm = useRealm();
  const data = useQuery(Category);

  const save = (value: string) => {
    realm.write(() => {
      return realm.create('CATEGORIES', Category.generate(value));
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

  const toObject = (element: Category) => {
    if (element === undefined) {
      return undefined;
    }
    return {label: element.value, value: element._id};
  };

  return {
    save,
    filter,
    filterById,
    deleteRecord,
    filterByValue,
    update,
    toObject,
  };
};

export default CategoryRepository;
