import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {Appbar} from 'react-native-paper';

import styles from './../styles/Main';

const Layout = ({headers, children}) => {
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
