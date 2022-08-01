import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Linking,
  Platform
} from "react-native";
import { ParkingContext } from "../contexts/ParkingContext";

function SuccessScreen (props) {

  const { selectedParking } = useContext(ParkingContext);

  //useEffect(() => props.navigation.addListener('beforeRemove', (e) => e.preventDefault()));

  const openMapApp = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${selectedParking.coords.x},${selectedParking.coords.y}`;
    const label = `${selectedParking.name}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.successText} >Success!</Text>
      <Button title="Get Directions" onPress={openMapApp} />
    </View>
  )
}

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  successText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    padding: 40
  }
})
