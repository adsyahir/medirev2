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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import {useState, useEffect} from 'react';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

LogBox.ignoreLogs([
  ' '
]);

export default function Dependent({navigation}) {
  const [ready, setReady] = React.useState(false);

  const [listDep, setDepList] = React.useState([]);

  React.useEffect(() => {
    getDepList();
  }, []);

  const getDepList = async () => {
    try {
      const depList = await AsyncStorage.getItem('depList');
      if (depList != null) {
        setDepList(JSON.parse(depList));
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    saveDepList(listDep);
    console.log(listDep);
  }, [listDep]);

  const saveDepList = async listDep => {
    try {
      const stringifyDepList = JSON.stringify(listDep);
      await AsyncStorage.setItem('depList', stringifyDepList);
    } catch (error) {
      console.log(error);
    }
  };

  const registerMed = () => {
    navigation.navigate('Dep Profile', {
      listDep: listDep,
      setDepList: setDepList,
    });
  };
  const renderItemAccessory = index => (
    <Button status='info' onPress={() => deleteDepList(index)} size="small">
      <Icon name="trash"></Icon>
    </Button>
  );

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.dep_name}`}
      description={`${item.dep_relay}`}
      accessoryRight={() => renderItemAccessory(item.id)}
      onPress={() =>
        navigation.navigate('List Medicine', {
          dep_name: item.dep_name,
          dep_id: item.id,
          listDep: listDep,
          setDepList: setDepList,
          dep_age: item.dep_age,
          dep_relay: item.dep_relay,
          index: index,
        })
      }
    />
  );

  const deleteDepList = index => {
    Alert.alert('Confirm', 'Delete this dependent?', [
      {
        text: 'Yes',
        onPress: () => setDepList(listDep.filter(item => item.id != index)),
      },
      {
        text: 'No',
      },
    ]);
  };

  useEffect(() => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  }, []);

  /* console.log(listDep[i].dep_med.length) 
   for(let i = 0; i < listDep.length; i++) {
       for(let j = 0; j < listDep[j].dep_med.length; j++)
       {
        console.log((listDep[i].dep_med[0].time).length)
       } 
      }*/

      
      BackgroundTimer.runBackgroundTimer(() => {
    for (let i = 0; i < listDep.length; i++) {
      for (let j = 0; j < listDep[i].dep_med.length; j++) {
        for (let m = 0; m < listDep[i].dep_med[j].time.length; m++) {
          let today = new Date();
          console.log(
            'time storage: ' +
              m +
              ' ' +
              listDep[i].dep_med[j].time[m].slice(0, 5),
          );
          console.log('time in phone: ' + today.toTimeString().slice(0, 5));
          if (
            listDep[i].dep_med[j].time[m].slice(0, 5) ===
            today.toTimeString().slice(0, 5)
          ) {
            console.log('yes notification');
            PushNotification.localNotification({
              channelId: 'test-channel',
              bigText: 'Take ' + listDep[i].dep_med[j].capsule_num + ' capsule',
              title: listDep[i].dep_med[j].med_name,
              message: 'Expand me to see more',
            });
          } else {
            console.log('no notification');
          }
        }
      
      }
    }
  }, 60000);

       

  return (
    <View style={styles.container}>
      <Button
        style={styles.flex}
        icon="plus"
        status='info'
        mode="contained"
        onPress={registerMed}>
        
        <Icon  name="plus"> </Icon>
      </Button>
      <View style={styles.row}>
      {
        listDep.length === 0 ?
        <View style={styles.dependent}>
        <Text style={{color:'gray'}}> No Dependent</Text>
        </View>
        :
        <List
          data={listDep}
          renderItem={renderItem}
          style={styles.container1}
          ItemSeparatorComponent={Divider}
        />
      }

      </View>
    </View>
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
  dependent:{
    justifyContent:'center',
    alignItems:'center',
    height:500,
  }
});
