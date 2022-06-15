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
  Icon,
  IndexPath,
  Button,
  CheckBox,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState, useEffect} from 'react';
import TextRecognition from 'react-native-text-recognition';
import firestore from '@react-native-firebase/firestore';

export default function MedCabinet() {
  let [userId, setUserId] = useState(null);
  let [userData, setUserData] = useState({});
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const searchUser = () => {
    if (userId) {
      firestore()
        .collection('Medicines')
        .doc(userId)
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
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, onPhotoSelect);
    }
  };

  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'image'}, onImageSelect);

  const onPhotoSelect = async media => {
    if (!media.didCancel) {
      setImage(media.assets[0].uri);
      console.log(image);
      const processingResult = await TextRecognition.recognize(image);
      console.log(processingResult);
      setUserId(processingResult.toLocaleString());
    }
  };
  const onImageSelect = async media => {
    if (!media.didCancel) {
      setImage(media.assets[0].uri);
      console.log(image);
      const processingResult = await TextRecognition.recognize(image);
      console.log(processingResult);
      setUserId(processingResult.toLocaleString());
    }
  };
  useEffect(() => {
    setResult(null);
  }, [image]);

  const chooseImage = () => {
    Alert.alert('Confirm', 'Image from?', [
      {
        text: 'Capture',
        onPress: () => onTakePhoto('photo'),
      },
      {
        text: 'Library',
        onPress: () => onSelectImagePress(),
      },
    ]);
  };
  return (
    <View style={{paddingHorizontal: 35}}>
      <Input
        placeholder="Enter User Id"
        onChangeText={userId => setUserId(userId)}
        value={userId}
        style={{padding: 10}}
      />

      <Button onPress={searchUser}>Search User</Button>
      <Button onPress={chooseImage}>OCR</Button>
      <View style={{marginTop: 10}}>
        <Text>Medicine Name: {userData ? userData.id : ''}</Text>
        <Text>
          Medication Indication: {userData ? userData.indication : ''}
        </Text>
        <Text>{userId}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
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
});
