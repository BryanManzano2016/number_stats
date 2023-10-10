import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from '../components/Icons';
import Categories from '../screens/Categories';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="categories"
        options={{
          headerShown: false,
          title: 'Categorias',
          tabBarIcon: ({color, size}) =>
            Icons({id: 'home', color: color, size: size}),
        }}
        component={Categories}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
