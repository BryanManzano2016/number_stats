import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from '../components/Icons';
import Categories from '../screens/Categories';
import NumberForm from '../screens/NumberForm';
import Resume from '../screens/Resume';
import HistoryNumbers from '../screens/HistoryNumbers';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="resume"
        options={{
          headerShown: false,
          title: 'Resumen',
          tabBarIcon: ({color, size}) =>
            Icons({id: 'format-list-numbered', color: color, size: size}),
        }}
        component={Resume}
      />
      <Tab.Screen
        name="numbers"
        options={{
          headerShown: false,
          title: 'Registro',
          tabBarIcon: ({color, size}) =>
            Icons({id: 'form-select', color: color, size: size}),
        }}
        component={NumberForm}
      />
      <Tab.Screen
        name="categories"
        options={{
          headerShown: false,
          title: 'Categorias',
          tabBarIcon: ({color, size}) =>
            Icons({id: 'sitemap', color: color, size: size}),
        }}
        component={Categories}
      />
      <Tab.Screen
        name="history"
        options={{
          headerShown: false,
          title: 'Historial',
          tabBarIcon: ({color, size}) =>
            Icons({id: 'history', color: color, size: size}),
        }}
        component={HistoryNumbers}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
