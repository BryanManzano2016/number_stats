import React, {useEffect} from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
import {Appbar} from 'react-native-paper';

import styles from './../styles/Main';
import {printToast} from './Utils';

const Layout = ({
  headers,
  children,
  route,
}: {
  headers?: any;
  children: any;
  route: any;
}) => {
  useEffect(() => {
    printToast();
  }, [route]);

  return (
    <>
      {headers && (
        <Appbar.Header style={styles.header}>
          <>{headers}</>
        </Appbar.Header>
      )}
      <SafeAreaView style={styles.layout}>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag">
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Layout;
