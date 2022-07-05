import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddReminder from './AddReminder';
import PillReminder from "./PillReminder";
import Reminder from "./Reminder";
import Dependent from "./Dependent";
import DepProfile from "./DepProfile";
import MedDetails from "./MedDetails";

const Stack = createStackNavigator();

export default function FirstScreenNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dependent" component={Dependent} options={{
          title: 'Dependent List',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      <Stack.Screen name="Dep Profile" component={DepProfile} 
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      
      <Stack.Screen
        name="List Medicine"
        component={PillReminder}
        options={{
          title: 'Word Selector',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      
      <Stack.Screen
        name="Med details"
        component={MedDetails}
        options={{
          title: 'Word Selector',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      <Stack.Screen name="Add Reminder" component={AddReminder} options={{
          title: 'Word Selector',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      <Stack.Screen name="Reminder" component={Reminder} options={{
          title: 'Word Selector',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
    </Stack.Navigator>
  );
};
/*options={{
  headerRight: () => (
    <TouchableOpacity
onPress={register}
style={{marginRight: 10}}>
<Text style={{color:'black'}}>Next</Text>
</TouchableOpacity>
  ),
}}   */

