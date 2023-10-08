import React from 'react';
import {View} from 'react-native';
import {Card, Text, IconButton, Appbar} from 'react-native-paper';

import styles from '../styles/Main';
import Layout from '../components/Layout';
import isEmpty from 'lodash/isEmpty';

const categories = [{label: 'Efectivo'}, {label: 'Deudas'}];

const History = ({navigation}) => {
  return (
    <Layout
      headers={
        <>
          {/* <Appbar.BackAction onPress={navigation.goBack} /> */}
          <Appbar.Content title="Categorias" />
          <Appbar.Action
            icon="plus-circle"
            onPress={() => {
              console.log('first');
            }}
          />
        </>
      }>
      <View style={styles.view}>
        <Text style={styles.textTitle}>Lista de categorias</Text>
      </View>
      {categories.map(item => (
        <Card key={item.label} style={styles.card}>
          <Card.Content>
            <View style={styles.viewCol}>
              <Text style={styles.cardTitleText} variant="bodyLarge">
                {item.label}
              </Text>
              <View style={styles.viewCol}>
                <IconButton
                  icon="pencil"
                  size={25}
                  style={styles.iconButtonCol}
                  onPress={() => {}}
                />
                <IconButton
                  icon="delete"
                  size={25}
                  style={styles.iconButtonCol}
                  onPress={() => {}}
                />
              </View>
            </View>
          </Card.Content>
        </Card>
      ))}
      {isEmpty(categories) && (
        <View style={styles.view}>
          <Text style={styles.text}>Sin elementos</Text>
        </View>
      )}
    </Layout>
  );
};

export default History;
