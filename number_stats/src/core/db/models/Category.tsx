import {Realm} from '@realm/react';

import {v4 as uuid} from 'uuid';

class Category extends Realm.Object {
  _id!: string;
  value!: string;

  static generate(value: string) {
    return {
      _id: uuid(),
      value,
    };
  }

  static schema = {
    name: 'CATEGORIES',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      value: 'string',
    },
  };
}

export default Category;
