import React from 'react';
import 'react-native-get-random-values';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {RealmProvider} from '@realm/react';

import HomeTabs from '../components/HomeTabs';
import CategoriesCreate from '../screens/CategoriesCreate';
import CategoriesUpdate from '../screens/CategoriesUpdate';
import Category from '../core/db/models/Category';
import ValuesCategory from '../core/db/models/ValuesCategory';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <PaperProvider>
      <RealmProvider schema={[Category, ValuesCategory]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="home"
              options={{title: 'Home', headerShown: false}}
              component={HomeTabs}
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
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </PaperProvider>
  );
};

export default Index;
