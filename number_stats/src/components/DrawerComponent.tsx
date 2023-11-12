import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from './Icons';
import Categories from '../screens/Categories';
import NumberForm from '../screens/NumberForm';
import Resume from '../screens/Resume';
import HistoryNumbers from '../screens/HistoryNumbers';
import {printToast} from './Utils';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import Information from '../screens/Information';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DrawerComponent = ({navigation, route}) => {
  useEffect(() => {
    printToast();
  }, [route]);

  return (
    <Drawer.Navigator
      initialRouteName="drawer"
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get('window').width * 0.5,
        },
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="drawer"
        component={Tabs}
        options={() => ({title: 'Home'})}
      />
      <Drawer.Screen
        name="categories"
        options={{
          headerShown: false,
          title: 'Categorias',
        }}
        component={Categories}
      />
      <Drawer.Screen
        name="information"
        options={{
          headerShown: false,
          title: 'Informacion',
        }}
        component={Information}
      />
    </Drawer.Navigator>
  );
};

const Tabs = ({route}) => {
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

export default DrawerComponent;
