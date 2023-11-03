import React from 'react';
import {Snackbar} from 'react-native-paper';
import {getItem, getItemAsBool, setItem} from '../core/SimpleStorage';

const SnackBar = () => {
  const text = getItem('snackBarText', undefined);
  let isVisible = getItemAsBool('snackBarVisible') ?? false;

  return (
    <Snackbar
      duration={5000}
      visible={isVisible}
      onDismiss={() => {
        console.log('oD');
        setItem('snackBarVisible', false);
        setItem('snackBarText', '');
      }}>
      {text}
    </Snackbar>
  );
};

export default SnackBar;
