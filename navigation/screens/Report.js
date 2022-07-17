import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { useState, useEffect } from 'react';
import { Divider, List, ListItem } from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';

export default function Report() {
  const [location, setLocation] = useState(null); //
  const [latitude, setLatitude] = useState(57.709127); //
  const [longitude, setLongitude] = useState(11.934746); //
  let [listData, setListData] = useState([]);
  const [listPlace, setListPlace] = useState([]);

  function distance(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  }
  const handleLocationPermission = async () => {
    let permissionCheck = '';
    if (Platform.OS === 'ios') {
      permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }

    if (Platform.OS === 'android') {
      permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (
        permissionCheck === RESULTS.BLOCKED ||
        permissionCheck === RESULTS.DENIED
      ) {
        const permissionRequest = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        permissionRequest === RESULTS.GRANTED
          ? console.warn('Location permission granted.')
          : console.warn('location permission denied.');
      }
    }
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLatitude(latitude);
        setLongitude(longitude);
        console.log('current latitude' + latitude);
        console.log('current longitude' + longitude);
        firestore()
          .collection('places')
          .get()
          .then(querySnapshot => {
        
            let temp = [];
            console.log('Total users: ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
              console.log('user Id: ', documentSnapshot.id);
          
              let userDetails = {};
          
              userDetails = documentSnapshot.data();
      
              userDetails['id'] = documentSnapshot.id;

              console.log(userDetails['latitude']);
              console.log(userDetails['longitude']);
              if (distance(userDetails['latitude'],latitude,userDetails['longitude'],longitude,) < 10) {
                temp.push(userDetails);
                setListData(temp);
              } else {
                console.log('no push');
              }
            });
            setListPlace(temp);
          });
      },
      error => {
        console.log(error.code, error.message);
      },

      { enableHighAccuracy: true, timeout: 15000, maximumAge: 100000 },
    );
  };
  console.log('hello' + listData);
  useEffect(() => {
    handleLocationPermission();
  }, []);

  const renderItem = ({ item }) => (
    <ListItem title={`${item.id}`} description={`${item.address}`} />
  );
  /* 
  function ren() {
    if (listPlace.length === 0) {
      return <Text>No nearby clinics or pharmacies</Text>;
    } else {
      return (
        <List
          style={styles.container1}
          data={listPlace}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      );
    }
*/
  /* function place() {
  listPlace.map(item => {
    return (

        <Marker
          coordinate={{latitude: item.latitude, longitude: item.longitude}}
          title={item.id}></Marker>
    );
  });
} */

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}>
          <MapView.Circle
            key={(latitude + longitude).toString()}
            center={{
              latitude: latitude,
              longitude: longitude,
            }}
            radius={10000}
            strokeWidth={2}
            strokeColor={'blue'}
            fillColor={'rgba(230,238,255,0.5)'}
            showsUserLocation={true}
          // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
          />
          {listData.map((item, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.id}></Marker>
            );
          })}
        </MapView>
      </SafeAreaView>
      <View style={styles.container1}>
        <List
          style={styles.container1}
          data={listData}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 300,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container1: {
    maxHeight: 2000,
  },
  list: {
    justifyContent: 'flex-end',
  },
});
