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
      <Text>Medicine name: {med_name}</Text>
      <Text>Number of capsule: {capsule_num}</Text>
      <Text>Times a day: {how_times}</Text>
      {masa.map((item, index) => (
        <Text key={index}>Time {index+1}:{item}</Text>
      ))}
    </View>
  );
}
