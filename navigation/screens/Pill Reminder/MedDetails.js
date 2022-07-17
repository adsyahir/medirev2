import React, {useState,useEffect} from 'react';
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
import {useRoute} from '@react-navigation/native';

const _12FromTo24Hours = require("12fromto24hours");

export default function MedDetails() {
  const route = useRoute();
  let med_name = route.params.med_name;
  let capsule_num = route.params.capsule_num;
  let how_times = route.params.how_times;
  let time = route.params.time.length;
  let t = route.params.time;
  const [masa, setMasa] = useState([]);
  

    let m = 0;
    let i = 23;
    for (let j = 0; j < time; j++) {
      masa.push(t.toString().slice(m, i));
      m = m + 24;
      i = i + 24;
    }
  

  return (
    <View>
      <Layout style={styles.layout}  level='3'>
      <View style={styles.row}>
    <Text category='label' >Medication name: </Text>
    <Text category='c1' >{med_name}</Text>
    </View>
    <View style={styles.row}>
    <Text category='label' >Number of capsule: </Text>
    <Text category='c1' >{capsule_num}</Text>
    </View>
    <View style={styles.row}>
    <Text category='label' >Times a day: </Text>
    <Text category='c1' >{how_times}</Text>
    </View>
      {masa.map((item, index) => (
        <View style={styles.row} key={index}>
    <Text category='label' >Time {index+1} : </Text>
    <Text category='c1' >{_12FromTo24Hours(item.slice(0,5))}</Text>
    </View>
      ))}
    </Layout>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
