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
      <Stack.Screen name="Dependent" component={Dependent} />
      <Stack.Screen name="Dep Profile" component={DepProfile} />
      <Stack.Screen
        name="List Medicine"
        component={PillReminder}
      />
      <Stack.Screen
        name="Med details"
        component={MedDetails}
      />
      <Stack.Screen name="Add Reminder" component={AddReminder} />
      <Stack.Screen name="Reminder" component={Reminder} />
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

