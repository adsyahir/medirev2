import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  Input,
  Select,
  SelectItem,
  Layout,
  IndexPath,
  Button,
  CheckBox,
  Text,
  useTheme,
  
} from '@ui-kitten/components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState, useEffect} from 'react';
import TextRecognition from 'react-native-text-recognition';
import { useRoute } from "@react-navigation/native";
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

export default function MedCabinet({navigation}) {
  const route = useRoute();
  React.useEffect(() => {
    if (route.params?.text) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      setUserId(route.params?.text)
      console.log("hello"+userId);
    }
  }, [route.params?.text]);
  
  
  const [userId, setUserId] = useState();
  let [userData, setUserData] = useState({});
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
 
  const searchUser = () => {
    if (selectedValue.title) {
      firestore()
        .collection('Medicines')
        .doc(selectedValue.title)
        .get()
        .then(documentSnapshot => {
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

  

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const onTakePhoto = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'high',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, onPhotoSelect);
    }
  };
  const onPhotoSelect = async media => {
      
    const processingResult = await TextRecognition.recognize(media.assets[0].uri);
    console.log(processingResult);
    navigation.navigate("Word Selector", {
      result: processingResult.toLocaleString(),
    });
};
  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'photo'}, onImageSelect);

  const onImageSelect = async media => {
      
      const processingResult = await TextRecognition.recognize(media.assets[0].uri);
      console.log(processingResult);
      navigation.navigate("Word Selector", {
        result: processingResult.toLocaleString(),
      });
    
  };
  useEffect(() => {
    setResult(null);
  }, [image]);

  const chooseImage = () => {
    Alert.alert('Confirm', 'Image from?', [
      {
        text: 'Capture',
        onPress: () => onTakePhoto('image'),
      },
      {
        text: 'Library',
        onPress: () => onSelectImagePress(),
      },
    ]);
  };

  const toWord = () => {
    navigation.navigate('Word Selector');
  };
  
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [suggestion, setSuggestion] = React.useState([]);
  const [selectedValue, setSelectedValue] = useState({userId});
  useEffect(() => {
    firestore()   
          .collection('Medicines')
          .get()
          .then(querySnapshot => {
            /*
            A QuerySnapshot allows you to inspect the collection,
            such as how many documents exist within it,
            access to the documents within the collection,
            any changes since the last query and more.
        */
            let temp = [];
            console.log('Total users: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
              console.log('user Id: ', documentSnapshot.id);
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
              temp.push({
                title: userDetails['id'],
              })
             
             
            });
            setData(temp)
          });
  }, []);
  console.log( data)

  const searchText =(text) => {

    setUserId(text);
    let matches = [];

    if(text){
      matches = data.filter(res => {
        const regex = new RegExp(`${text.trim()}`, 'i');
        return res.title.match(regex);
      })
        setSuggestion(matches);
    }else
    {
      setSuggestion([])
    }

  }
 
  return (
    <View style={styles.screen}>
       <Autocomplete autoCapitalize='none'
       autoCorrect={false}
       containerStyle={styles.containerStyle}
       inputContainerStyle={styles.inputContainerStyle}
       listStyle={styles.listStyle}
       placeholder={"Please enter medicine"}
         value={userId}
       onChangeText={(userId)=>searchText(userId)}
       data={suggestion}
       defaultValue={
       JSON.stringify(selectedValue) === '{}' ?
            '' :
            selectedValue.title 
          }
       flatListProps={{
        renderItem: ({ item }) => <TouchableOpacity
              onPress={() => {
                setSelectedValue(item);
                setSuggestion([]);
                setUserId(item.title)
              }}>
              <Text style={styles.listTitle}>{item.title}</Text>
            </TouchableOpacity>,
      }}
       
       />
       <TouchableOpacity style={styles.icon} onPress={chooseImage}><Icon name="camera"> </Icon></TouchableOpacity>
       <Button status='info' style={styles.button} onPress={searchUser}><Icon name="search"> </Icon></Button>
       {
        userId === '' ?
       <Text></Text>
        :
        <View style={styles.indication}>
        <Text>
         {userData ? userData.indication : ''}
        </Text>
        </View>
       }
       
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    position:'relative',
    right:-270,
    bottom:1,
    width:70,
  },
  icon:{
    position:'relative',
    right:-230,
    bottom:-25,
    width:70,
  },
  flex:{
    flexDirection:'row',
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 30,
    borderRadius: 10,
  },
 containerStyle:{
   position:'absolute',
   right:100,
   width:'90%',
 },
 inputContainerStyle:{
   marginVertical:10,
   marginHorizontal:10,
   backgroundColor:'blue',
   borderWidth:2,
 },
 listStyle:{
   marginVertical:10,
   marginHorizontal:10,
   backgroundColor:'red',
 },
 listContainer:{
marginHorizontal:25,
marginVertical:5,
 },
 listTitle:{
   fontSize:20,
   left:10,
   backgroundColor:'white',
width:286,
paddingLeft:5,
 },
 indication:{
   
   marginTop:100,
 }
});
