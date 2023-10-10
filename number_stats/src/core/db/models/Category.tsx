import {Realm} from '@realm/react';
import {ENTITIES_DB} from '../../../utils/Constants';

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
    name: ENTITIES_DB.CATEGORIES,
    primaryKey: '_id',
    properties: {
      _id: 'string',
      value: 'string',
    },
  };
}

export default Category;
