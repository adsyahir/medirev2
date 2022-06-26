import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationMed from './screens/MedCabinet/NavigationMed';
import Report from './screens/Report.js';
import FirstScreenNavigator from './screens/Pill Reminder/NavigationReminder';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Screen_A" component={FirstScreenNavigator} options={{
            headerShown: false,
          }} />
        <Tab.Screen name="Screen_B" component={NavigationMed} options={{
            headerShown: false,
          }}  />
        <Tab.Screen name="Geolocation" component={Report} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
