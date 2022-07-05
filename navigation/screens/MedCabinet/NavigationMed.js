import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MedCabinet from './MedCabinet';
import WordSelector from "./WordSelector";

const Stack = createStackNavigator();

export default function SecondScreenNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MedCabinet" component={MedCabinet} options={{
          title: 'Medication Cabinet',
          headerStyle: {
            backgroundColor: '#0095ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      <Stack.Screen name="Word Selector" component={WordSelector} options={{
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

