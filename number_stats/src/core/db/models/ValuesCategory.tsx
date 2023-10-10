import {Realm} from '@realm/react';
import {ENTITIES_DB} from '../../../utils/Constants';

import {v4 as uuid} from 'uuid';

class ValuesCategory extends Realm.Object {
  _id!: string;
  idCategory!: string;
  value!: number;
  createdAt!: Date;

  static generate(idCategory: string, value: number) {
    return {
      _id: uuid(),
      idCategory,
      value,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: ENTITIES_DB.VALUES_CATEGORIES,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      idCategory: 'string',
      value: 'double',
      createdAt: 'date',
    },
  };
}

export default ValuesCategory;
