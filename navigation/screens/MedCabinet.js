import {StyleSheet, View} from 'react-native';
import {
  Input,
  Select,
  SelectItem,
  Layout,
  Icon,
  IndexPath,
  Button,
  CheckBox,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React, { useEffect, useState, useRef } from "react";
import firestore from '@react-native-firebase/firestore';

export default function MedCabinet() {
  let [userId, setUserId] = useState('Paracetamol');
  let [userData, setUserData] = useState({});
 
  const searchUser = () => {
    if (userId) {
      firestore()
        .collection('Medicines')
        .doc(userId)
        .get()
        .then((documentSnapshot) => {
          /*
            A DocumentSnapshot belongs to a specific document,
            With snapshot you can view a documents data,
            metadata and whether a document actually exists.
          */
          let userDetails = {};
          // Document fields
          userDetails = documentSnapshot.data();
          // All the document related data
          userDetails['id'] = documentSnapshot.id;
          setUserData(userDetails);
        });
    }
  };
  return (
    <View style={{paddingHorizontal: 35}}>
    <Input
      placeholder="Enter User Id"
      onChangeText={(userId) => setUserId(userId)}
      value={userId}
      style={{padding: 10}}
    />
    <Button  onPress={searchUser}>Search User</Button>
    <View style={{marginTop: 10}}>
      <Text>
        Medicine Name: {userData ? userData.id : ''}
      </Text>
      <Text>
        Medication Indication: {userData ? userData.indication : ''}
      </Text>
    </View>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 30,
  },
  row: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
});
