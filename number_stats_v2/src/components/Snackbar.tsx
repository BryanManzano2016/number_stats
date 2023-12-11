import React from 'react';
import {Snackbar} from 'react-native-paper';
import {cacheGetItem, getItemAsBool, cacheSetItem} from '../core/SimpleStorage';

const SnackBar = () => {
  const text = cacheGetItem('snackBarText', undefined);
  let isVisible = getItemAsBool('snackBarVisible') ?? false;

  return (
    <Snackbar
      duration={5000}
      visible={isVisible}
      onDismiss={() => {
        cacheSetItem('snackBarVisible', false);
        cacheSetItem('snackBarText', '');
      }}>
      {text}
    </Snackbar>
  );
};

export default SnackBar;
