import React, { useState, useContext } from "react";
import { ParkingContext } from "../../contexts/ParkingContext.js";
import { Marker, Callout } from "react-native-maps";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import "./styles.js";

function ParkingSpot(props) {

  const { setSelectedParking } = useContext(ParkingContext);

  let startHours = props.parkingSpot.start_time.substring(0, 2) - 4;
  const startMins = props.parkingSpot.start_time.substring(3, 5);
  let endHours = props.parkingSpot.end_time.substring(0, 2) - 4;
  const endMins = props.parkingSpot.end_time.substring(3, 5);
  let startMeridiem = "am";
  let endMeridiem = "am";

  if (startHours >= 12) {
    startHours -= 12;
    startMeridiem = "pm";
  }
  if (endHours >= 12) {
    endHours -= 12;
    endMeridiem = "pm";
  }

  return (
    <Marker
      coordinate={{
        latitude: props.parkingSpot.coords.x,
        longitude: props.parkingSpot.coords.y,
      }}
      onPress={() => setSelectedParking(props.parkingSpot)}
      // onPress={() => console.log('PRESS INSIDE MARKER')}
      
    >
      <Image
        style={styles.parkingSymbol}
        source={require("../../assets/parking-symbol.png")}
      />
      <Callout style={styles.parkingCallout} >
        <View style={{ alignSelf: 'flex-start' }}>
          {/* <Text>Parking available</Text> */}
          <Text style={styles.titleText}>{props.parkingSpot.name}</Text>
          <Text>{props.parkingSpot.description}</Text>
          <Text style={styles.costText}>
            ${(props.parkingSpot.cost / 100).toFixed(2)}/hour
          </Text>
          <Image
            style={styles.parkingPreview}
            // source={require("../../app/assets/driveway/" + parkingSpot.image +".jpg")}
            source={require("../../assets/driveway1.jpg")}
          />
          <Text>Available from</Text>
          <Text>{startHours}:{startMins}{startMeridiem} to</Text>
          <Text>{endHours}:{endMins}{endMeridiem}</Text>
          <Text>({props.parkingSpot.allow_weekends ? 'Including' : 'Except'} weekends)</Text>
        </View>
      </Callout>
    </Marker>
  );
  
}

const styles = StyleSheet.create({
  parkingSymbol: {
    width: 50,
    height: 50,
  },
  parkingPreview: {
    width: 150,
    height: 100,
  },
  titleText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  costText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  parkingCallout: {
    //flex: 1,
    //position: 'relative',
    width: 200,
  },
});

export default ParkingSpot;
