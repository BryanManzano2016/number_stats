import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import {RealmProvider} from '@realm/react';

import HomeTabs from '../components/HomeTabs';
import Layout from './Layout';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <PaperProvider>
      <RealmProvider schema={[]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{title: 'Home', headerShown: false}}
              component={HomeTabs}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </PaperProvider>
  );
};

export default Index;
