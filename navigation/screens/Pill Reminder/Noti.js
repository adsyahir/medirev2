import React from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import {
  Input,
  Select,
  SelectItem,
  Layout,
  IndexPath,
  Button,
  CheckBox,
  Text,
  ListItem,
  List,
  Divider,
} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Noti({ navigation }) {
  const [ready, setReady] = React.useState(false);

  const [listDep, setDepList] = React.useState([]);

  React.useEffect(() => {
    getDepList();
  }, []);

  const getDepList = async () => {
    try {
      const depList = await AsyncStorage.getItem("depList");
      if (depList != null) {
        setDepList(JSON.parse(depList));
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    saveDepList(listDep);
  }, [listDep]);

  const saveDepList = async (listDep) => {
    try {
      const stringifyDepList = JSON.stringify(listDep);
      await AsyncStorage.setItem("depList", stringifyDepList);
    } catch (error) {
      console.log(error);
    }
  };

  const registerMed = () => {
    navigation.navigate("Dep Profile", {
      listDep: listDep,
      setDepList: setDepList,
    });
  };
  const renderItemAccessory = (index) => (
    <Button onPress={() => deleteDepList(index)} size="small">
      <Icon name="trash"></Icon>
    </Button>
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.dep_name}`}
      description={`${item.dep_relay}`}
      accessoryRight={() => renderItemAccessory(item.id)}
      onPress={() => navigation.navigate("List Medicine",{
        dep_name: item.dep_name,
        dep_id: item.id,
        listDep:listDep,
        setDepList:setDepList,
        index:index,
      })}
    />
  );

  const deleteDepList = (index) => {
    Alert.alert("Confirm", "Delete this dependent?", [
      {
        text: "Yes",
        onPress: () => setDepList(listDep.filter((item) => item.id != index)),
      },
      {
        text: "No",
      },
    ]);
  };

  for (let i = 0; i < listDep.length; i++) {
    for (let j = 0; j < listDep[j].length; j++) {
      for (let m = 0; m < (listDep[i].dep_med[j].time).length; m++) {

        Notifications.scheduleNotificationAsync({
          content: {
            title: "Title",
            body: "body",
            data: { data: "data goes here" }
          },
          trigger: {seconds:1}
        });
      }
    }
  }
  

  return (
    <></>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    bottom: 25,
    right: 20,
    position: 'absolute',
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 100,
  },
  container1: {
    maxHeight: 2000,
  },
});
