import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationMed from './screens/MedCabinet/NavigationMed';
import Report from './screens/Report.js';
import FirstScreenNavigator from './screens/Pill Reminder/NavigationReminder';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
    "tabBarHideOnKeyboard":"true",
    
    
  }}
  tabBarOptions={{
       activeTintColor: '#fff',
       inactiveTintColor: 'lightgray',
       activeBackgroundColor: '#2374ad',
       inactiveBackgroundColor: '#0095ff',
           style: {
                 backgroundColor: '#0095ff',
                 paddingBottom: 3
           }
    }}>
        <Tab.Screen name="Pill Reminder" component={FirstScreenNavigator} options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (<Icon name={"capsules"} color={color} size={size} />)    
          }} />
        <Tab.Screen name="Medication Cabinet" component={NavigationMed} options={{
            headerShown: false,
            tabBarIcon: ({size, color}) => (<Icon name={"medkit"} color={color} size={size} />)            
          }}  />
        <Tab.Screen name="Heatlh Care" component={Report} options={{
          title: 'Health Care',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({size, color}) => (<Icon name={"clinic-medical"} color={color} size={size} />)   
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
