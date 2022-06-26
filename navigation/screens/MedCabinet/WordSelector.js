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
export default function WordSelector() {

  const[text, setText] = useState("");


  const click = () => { 
    console.log(text);
   }
  return (<View>
 <SelectableText
          selectable={true}
          menuItems={["Copy"]}
          onSelection={({ content: ad }) => {
    setText(ad)
  }}
          style={styles.instructions}
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend laoreet risus nec accumsan. In bibendum urna id ante vehicula auctor. Donec ipsum nisi, malesuada quis erat ac, molestie facilisis lacus. Vestibulum a erat dui. In imperdiet, purus at venenatis fermentum, dui neque congue est, in suscipit metus magna malesuada ex. In hendrerit tincidunt mi, vel rhoncus eros dignissim non. Nulla tincidunt, tortor et dictum fermentum, sapien leo blandit nunc, nec rutrum nulla libero nec elit. Sed vitae urna sed eros volutpat venenatis. Nulla finibus velit ac odio elementum pharetra. Ut mollis metus est, vitae blandit urna venenatis at."
        />
<Button onPress={click}>Hello</Button>
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

