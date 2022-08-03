import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Linking,
  Platform
} from "react-native";
import { ParkingContext } from "../../contexts/ParkingContext";
import { CommonActions } from '@react-navigation/native';
import { styles } from "./styles.js";

function SuccessScreen (props) {

  const { selectedParking, setSelectedParking } = useContext(ParkingContext);

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

  const goToHome = () => {
    setSelectedParking(null);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'Map' },
        ],
      })
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.success}>Success!</Text>
      <Text style={styles.successText}>Your parking is reserved!</Text>
      <View style={styles.getDirections}>
        <Button title="GET DIRECTIONS" onPress={openMapApp} />
      </View>
      <Button title="Back to Map" onPress={goToHome}/>
    </View>
  )
}

export default SuccessScreen;
