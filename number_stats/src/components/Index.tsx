import React from 'react';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RealmProvider} from '@realm/react';
import {PaperProvider} from 'react-native-paper';

import DrawerComponent from './DrawerComponent';
import CategoriesCreate from '../screens/CategoriesCreate';
import CategoriesUpdate from '../screens/CategoriesUpdate';
import NumberFormUpdate from '../screens/NumberFormUpdate';

import Category from '../core/db/models/Category';
import ValuesCategory from '../core/db/models/ValuesCategory';
import ToastOwn from './ToastOwn';
import {Provider} from 'react-redux';
import {store} from '../store/Store';
import {initI18n} from '../core/i18n/I18n';

const Stack = createStackNavigator();

initI18n();

const Index = () => {
  return (
    <Provider store={store}>
      <RealmProvider schema={[Category, ValuesCategory]} schemaVersion={2}>
        <PaperProvider>
          <NavigationContainer onStateChange={() => {}} onReady={() => {}}>
            <Stack.Navigator>
              <Stack.Screen
                name="home"
                options={{title: 'Home', headerShown: false}}
                component={DrawerComponent}
              />
              <Stack.Screen
                name="categories/new"
                options={{headerShown: false}}
                component={CategoriesCreate}
              />
              <Stack.Screen
                name="categories/update"
                options={{headerShown: false}}
                component={CategoriesUpdate}
              />
              <Stack.Screen
                name="numbers/update"
                options={{headerShown: false}}
                component={NumberFormUpdate}
              />
            </Stack.Navigator>
            <ToastOwn />
          </NavigationContainer>
        </PaperProvider>
      </RealmProvider>
    </Provider>
  );
};

export default Index;
