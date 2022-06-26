import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MedCabinet from './MedCabinet';
import WordSelector from "./WordSelector";

const Stack = createStackNavigator();

export default function SecondScreenNavigator () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MedCabinet" component={MedCabinet} />
      <Stack.Screen name="Word Selector" component={WordSelector} />
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

