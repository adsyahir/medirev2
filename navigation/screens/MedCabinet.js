import {StyleSheet, View} from 'react-native';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";
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

export default function MedCabinet() {
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <Input
          style={styles.input}
          label="Medicine Name"
          placeholder="Enter Medicine Name"
          size="medium"

        /> 
         <Button
          size="small"
          appearance="outline"
          status="primary"
        >OCR </Button>
        <Button
          size="small"
          appearance="outline"
          status="primary"
        >Search </Button>
      </View>
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
  row: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
});
