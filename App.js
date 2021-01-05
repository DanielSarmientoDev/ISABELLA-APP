import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import Data from './Data/Data';
import DataDetail from './DataDetail/DataDetail';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Data" component={Data} />
        <Tab.Screen 
          name="DataDetail" 
          component={DataDetail} 
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
            },
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}