import React from 'react'
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
  return (<ScrollView>
       <Text style={styles.text} category='h1'>Please hold to select a word below and copy. Click submit to finish.</Text>
 <Text selectable={true}>{result}</Text>
 <View style={styles.row}>
<Button status='info' style={styles.button} onPress={click}>Submit</Button>
</View>
  </ScrollView>
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
  },
  button:{
    width:100,
    marginTop:20,
  },
  text:{
color:'black',
margin:15,
fontSize:20,
  },
  row:{
    justifyContent:'center',
    alignItems:'center',
  }
});

