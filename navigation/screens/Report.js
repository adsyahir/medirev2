import React from 'react';
import {StyleSheet, View, Text, SafeAreaView,StatusBar,Platform} from 'react-native';

import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" 
import Geolocation from "react-native-geolocation-service" 
import {useState, useEffect} from 'react';

export default function Report() {
  const [location, setLocation] = useState(null) // 

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
  };

  useEffect(() => {
    handleLocationPermission()
  }, [])

  useEffect(() => { // 👈
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setLocation({ latitude, longitude })
      },
      error => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 57.709127, 
            longitude: 11.934746   ,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true} // 👈
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})
