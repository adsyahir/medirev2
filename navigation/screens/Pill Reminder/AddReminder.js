import {
  StyleSheet,
  View,
  Picker,
  Platform,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import Reminder from "./Reminder";
import NavigationReminder from "./NavigationReminder";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from 'react-native-push-notification';

const frequency = ["Every Day", "Specific day"];
const howt = [1, 2, 3, 4, 5, 6, 7];
const to12Hours = require("to12hours");
const cap = [1, 2, 3, 4, 5, 6, 7];

export default function AddReminder({ navigation }) {
  const route = useRoute();
  let dep_name = route.params.dep_name;
  let dep_id = route.params.dep_id;
  let listDep = route.params.listDep;
  let setDepList = route.params.setDepList;
  let i = route.params.index;

  const [selectedHow, setSelectedHow] = React.useState(new IndexPath(0));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [selectedCap, setSelectedCap] = React.useState(new IndexPath(0));
  const [medName, setMedName] = React.useState("");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("00.00");
  const [time24, setTime24] = useState("");
  const [tempDate, setTempDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate1 = new Date(currentDate);
    setTempDate(new Date(currentDate));
    setTime(to12Hours(tempDate1.toTimeString().slice(0, 5)));
    setTime24(_12FromTo24Hours("9:00 PM"));
  };
  let numberOfMlSeconds = tempDate.getTime();
  let addMlSeconds = 60 * 5 * 60 * 1000;
  let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode("time");
  };
  const displayCap = cap[selectedCap.row];
  const renderOption = (title, cap) => (
    <SelectItem title={title} key={cap.toString()} />
  );
  const displayHowt = howt[selectedHow.row];

  const Submit = () => {
    if (medName == "" || time == "00.00") {
      Alert.alert("Error", "Please Enter Input");
    } else {
      let divided = 24 / displayHowt;
      let numberOfMlSeconds = tempDate.getTime();
      let addMlSeconds = 60 * divided * 60 * 1000;
      let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
      let times = [];
      let realTimes = [];
      for (let i = 0; i < displayHowt; i++) {
        if (i == 0) {
          times.push(newDateObj);
          realTimes.push(newDateObj.toTimeString());
        } else {
          let b4 = new Date(times[i - 1]);
          let numberOfMlSeconds = b4.getTime();
          let addMlSeconds = 60 * divided * 60 * 1000;
          let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
          times.push(newDateObj);
          realTimes.push(newDateObj.toTimeString());
        }
      }
      console.log(realTimes);
      const reminder = {
        med_id: Date.now(),
        med_name: medName,
        how_times: displayHowt,
        time: realTimes,
        capsule_num: displayCap,
      };

      const newDeplist = listDep.map((item, index) => {
        if (dep_id == item.id) {
          listDep[index].dep_med.push(reminder);
        }
        return item;
      });
      console.log(listDep);

      setDepList(newDeplist);
      navigation.navigate("List Medicine", {
        dep_name: dep_name,
        dep_id: dep_id,
        listDep: listDep,
        setDepList: setDepList,
        index: i,
      });
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
 useEffect(() => {
  
  PushNotification.createChannel({

    channelId:"test-channel",
    channelName:"Test Channel"
  }

  )
 }, [])
 
   const LocalNotification = () => {
    PushNotification.localNotification({
      channelId:"test-channel",
      bigText:
        'This is local notification demo in React Native app. Only shown, when expanded.',
      title: 'Local Notification Title',
      message: 'Expand me to see more',

    })
  }
  let today = new Date();
  console.log(today.getTime());
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Input
          style={styles.input}
          label="Medicine Name"
          placeholder="Enter Medicine Name"
          onChangeText={(text) => setMedName(text)}
          size="medium"
          value={medName}
        />
      </View>
      <View style={styles.row}>
        <Layout level="1">
          <Select
            label="HOW MANY TIMES A DAY?"
            style={styles.dropDown}
            placeholder="Default"
            value={displayHowt}
            selectedIndex={selectedHow}
            onSelect={(index) => setSelectedHow(index)}
          >
            {howt.map(renderOption)}
          </Select>
        </Layout>
      </View>
      <View style={styles.row}>
        <Button
          size="small"
          appearance="outline"
          status="primary"
          onPress={showTimepicker}
        >
          {time}
        </Button>
      </View>
      <View style={styles.row}>
        {show && (
          <DateTimePicker
            testID="TimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
          />
        )}
        <Select
          label="Capsule"
          style={styles.select}
          placeholder="Default"
          value={displayCap}
          selectedIndex={selectedCap}
          onSelect={(index) => setSelectedCap(index)}
        >
          {cap.map(renderOption)}
        </Select>
      </View>

      <Button
        onPress={() => {
          Submit();
        }}
      >
        Submit
      </Button>
      <Button
        onPress={() => {
          LocalNotification();
        }}
      >
        Test
      </Button>
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
  input: {
    width: 350,
  },
  text: {
    flex: 1,
    marginTop: 10,
    justifyContent: "flex-end",
    fontSize: 12,
  },
  row: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  dropDown: {
    width: 350,
    marginBottom: 10,
    color: "black",
  },
  button: {
    color: "yellow",
    backgroundColor: "black",
  },
  howt: {
    width: 150,
    marginBottom: 10,
    color: "black",
  },
  textCheckbox: {
    flex: 1,
    marginTop: 10,
    fontSize: 12,
    color: "black",
  },
  rowCheck: {
    flexDirection: "row",
  },
  rowText: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-between",
    marginLeft: 30,
  },
  select: {
    width: 150,
  },
});
