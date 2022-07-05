import React from 'react'
import { SelectableText } from "@alentoma/react-native-selectable-text";
import {useState, useEffect} from 'react';
import {
  Input,
  Select,
  SelectItem,
  Layout,
  Icon,
  IndexPath,
  Button,
  CheckBox,
  useTheme,
} from '@ui-kitten/components';
import {
  
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import { useRoute } from "@react-navigation/native";

export default function WordSelector({navigation}) {

  const route = useRoute();
  let result = route.params.result;

  const click = async () => {
    const text = await Clipboard.getString();
    navigation.navigate('MedCabinet', {
      text :text,
     
    })
 }
  return (<View>
 <Text selectable={true}>{result}</Text>
<Button onPress={click}>Submit</Button>
<Text>View copied text</Text>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#FF0000"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    color: "#0000FF"
  }
});

