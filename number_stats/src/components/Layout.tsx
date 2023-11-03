import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {Appbar} from 'react-native-paper';

import styles from './../styles/Main';
import Toast from 'react-native-toast-message';
import {getItem, setItem} from '../core/SimpleStorage';

const Layout = ({headers, children, route}) => {
  useEffect(() => {
    const message = getItem('toastMessage');
    if (!['', undefined].includes(message)) {
      Toast.show({
        type: 'error',
        text1: message,
      });
      setItem('toastMessage', '');
    }
  }, [route]);

  return (
    <>
      <Appbar.Header style={styles.header}>
        <>{headers}</>
      </Appbar.Header>
      <SafeAreaView style={styles.layout}>
        <ScrollView style={styles.scrollView}>{children}</ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Layout;
