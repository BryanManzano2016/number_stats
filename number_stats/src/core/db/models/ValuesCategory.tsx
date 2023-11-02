import {Realm} from '@realm/react';

import {v4 as uuid} from 'uuid';

class ValuesCategory extends Realm.Object {
  _id!: string;
  idCategory!: string;
  value!: number;
  createdAt!: Date;
  createdAtNumber!: number;

  static generate(idCategory: string, value: number, createdAt: number) {
    return {
      _id: uuid(),
      idCategory,
      value,
      createdAt: createdAt,
    };
  }

  static schema = {
    name: 'VALUES_CATEGORIES',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      idCategory: 'string',
      value: 'double',
      createdAt: 'int',
    },
  };
}

export default ValuesCategory;
