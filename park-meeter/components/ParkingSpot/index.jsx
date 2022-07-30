import React from "react";
import { Marker, Callout } from "react-native-maps";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import "./styles.js";

function ParkingSpot({ parkingSpot }) {

  let startHours = parkingSpot.start_time.substring(0, 2) - 4;
  const startMins = parkingSpot.start_time.substring(3, 5);
  let endHours = parkingSpot.end_time.substring(0, 2) - 4;
  const endMins = parkingSpot.end_time.substring(3, 5);
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
        latitude: parkingSpot.coords.x,
        longitude: parkingSpot.coords.y,
      }}
    >
      <Image
        style={styles.parkingSymbol}
        source={require("../../app/assets/parking-symbol.png")}
      />
      <Callout>
        <View style={{ alignSelf: 'flex-start' }}>
          {/* <Text>Parking available</Text> */}
          <Text style={styles.titleText}>{parkingSpot.name}</Text>
          <Text>{parkingSpot.description}</Text>
          <Text style={styles.costText}>
            ${(parkingSpot.cost / 100).toFixed(2)}/hour
          </Text>
          <Image
            style={styles.parkingPreview}
            // source={require("../../app/assets/driveway/" + parkingSpot.image +".jpg")}
            source={require("../../app/assets/driveway1.jpg")}
          />
          <Text>Available from</Text>
          <Text>{startHours}:{startMins}{startMeridiem} to</Text>
          <Text>{endHours}:{endMins}{endMeridiem}</Text>
          <Text>({parkingSpot.allow_weekends ? 'Including' : 'Except'} weekends)</Text>
          <Button title="GET" />
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
    width: 120,
    height: 80,
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
});

export default ParkingSpot;
