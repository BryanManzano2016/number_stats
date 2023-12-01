import React from 'react';
import {DB_ENCRYPT_KEY} from '../../../utils/Constants';
import {cacheGetItem} from '../../SimpleStorage';

import Category from '../models/Category';
import ValuesCategory from '../models/ValuesCategory';
import {RealmProvider as RealmProviderLibrary} from '@realm/react';
import Realm from 'realm';
import {stringToInt8Array} from '../../../utils/Utilities';

export const RealmProvider = ({child}: {child: any}) => {
  return (
    <RealmProviderLibrary
      schema={[Category, ValuesCategory]}
      schemaVersion={2}
      encryptionKey={stringToInt8Array(cacheGetItem(DB_ENCRYPT_KEY))}
      path={Realm.defaultPath}>
      {child}
    </RealmProviderLibrary>
  );
};
