import React from 'react';
import {Text, Appbar, Button} from 'react-native-paper';
import styles from '../styles/Main';
import Layout from '../components/Layout';
import {View} from 'react-native';
import {INFO_APP, MAX_RECORDS} from '../utils/Constants';
import {openLink} from '../utils/Utilities';

const Information = ({navigation, route}) => {
  return (
    <Layout
      route={route}
      headers={
        <>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title="Informacion" />
        </>
      }>
      <View style={styles.view}>
        <Text variant="titleLarge">
          {INFO_APP.NAME} {INFO_APP.VERSION}
        </Text>
        <Text style={styles.text} variant="bodyMedium">
          {INFO_APP.NAME} es una aplicación intuitiva y personalizable diseñada
          para la gestión eficiente de datos numéricos y la generación de
          gráficos. Los usuarios pueden crear categorías específicas, como
          'Finanzas', 'Salud', 'Productividad', entre otras, para organizar
          datos de manera lógica y temática. Dentro de cada categoría, los
          usuarios pueden agregar entradas numéricas, que luego la app procesa
          para producir visualizaciones gráficas. Esta herramienta es ideal para
          quienes buscan rastrear y analizar tendencias, patrones y estadísticas
          de diversas áreas de su vida o trabajo, facilitando la toma de
          decisiones basada en datos y la presentación de información clave. Con{' '}
          {INFO_APP.NAME}, transformar números en conocimientos accionables es
          sencillo y efectivo.
        </Text>
        <Text variant="titleMedium">Consideraciones</Text>
        <Text variant="bodyMedium">
          - El almacenamiento es en memoria interna
        </Text>
        <Text variant="bodyMedium">
          - Actualmente la aplicacion registra maximo {MAX_RECORDS} registros
          por categoria. Al llegar al limite los registros mas antiguos seran
          eliminados secuencialmente
        </Text>
        <Text variant="titleMedium">Tutorial</Text>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() =>
            openLink('https://www.youtube.com/watch?v=C0lo1oTa9Zs')
          }>
          Ir a tutorial
        </Button>
      </View>
    </Layout>
  );
};

export default Information;
