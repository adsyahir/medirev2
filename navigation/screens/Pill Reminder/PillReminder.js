import {StyleSheet, View, Alert} from 'react-native';
import {
  Input,
  Select,
  SelectItem,
  Layout,
  IndexPath,
  Button,
  CheckBox,
  Text,
  Divider,
  List,
  ListItem,
  
} from '@ui-kitten/components';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PillReminder({navigation}) {
  const route = useRoute();

  let dep_name = route.params.dep_name;
  let dep_id = route.params.dep_id;
  let listDep = route.params.listDep;
  let setDepList = route.params.setDepList;
  let relay = route.params.dep_relay;

  let age = route.params.dep_age;
  let i = route.params.index;
  console.log(listDep[i].dep_med);

  React.useEffect(() => {
    getDepList();
  }, []);

  const getDepList = async () => {
    try {
      const depList = await AsyncStorage.getItem('depList');
      if (depList != null) {
        setDepList(JSON.parse(depList));
        console.log(listDep);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    saveDepList(listDep);
  }, [listDep]);

  const saveDepList = async listDep => {
    try {
      const stringifyDepList = JSON.stringify(listDep);
      await AsyncStorage.setItem('depList', stringifyDepList);
    } catch (error) {
      console.log(error);
    }
  };
  const addMedication = () => {
    navigation.navigate('Add Reminder', {
      dep_name: dep_name,
      dep_id: dep_id,
      listDep: listDep,
      setDepList: setDepList,
      index: i,
      age: age,
      relay: relay,
    });
  };

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.med_name}`}
      description={`${item.how_times} times per day`}
      accessoryRight={() => renderItemAccessory(item.med_id)}
      onPress={() =>
        navigation.navigate('Med details', {
          med_name: item.med_name,
          capsule_num :item.capsule_num,
          how_times: item.how_times,
          time: item.time,
        })
      }
    />
  );
  const renderItemAccessory = index => (
    <Button  status='info' onPress={() => deleteMedList(index)} size="small">
      <Icon name="trash"></Icon>
    </Button>
  );
  const deleteMedList = index => {
    Alert.alert('Confirm', 'Delete this medicine ?', [
      {
        text: 'Yes',
        onPress: () => onDeleteHandler(index),
      },
      {
        text: 'No',
      },
    ]);
  };

  const onDeleteHandler = key => {
    setDepList(listDep =>
      listDep.map(listDep => ({
        ...listDep,
        dep_med: listDep.dep_med.filter(item => item.med_id !== key),
      })),
    );
    
  };

  console.log(listDep[i].dep_med.length)
  return (
    <View style={styles.container}>
    <Layout style={styles.layout} level='3'>
    <View style={styles.row}>
    <Text category='label' >Name: </Text>
    <Text category='c1' >{dep_name}</Text>
    </View>
    <View style={styles.row}>
    <Text category='label' >Age: </Text>
    <Text category='c1' >{age}</Text>
    </View>
    <View style={styles.row}>
    <Text category='label' >Relationship: </Text>
    <Text category='c1' >{relay}</Text>
    </View>
    </Layout>

    <Divider/>
      <Button
        style={styles.flex}
        icon="plus"
        mode="contained"
        status='info'
        onPress={addMedication}>
        <Icon name="plus"> </Icon>
      </Button>
      <View style={styles.row}>
      {
      listDep[i].dep_med.length === 0 ? 
      <Text style={styles.nomed}>No medication</Text>
        :
        <List
          data={listDep[i].dep_med}
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
  row:{
    flexDirection:'row',
    marginBottom:5,
  },
  layout:{
   padding:10,
  },
  nomed:{
    margin:150,  
  color: 'gray',
  }
});
