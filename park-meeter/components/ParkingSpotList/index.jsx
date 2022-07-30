import React from "react";
import { Marker, Callout } from "react-native-maps";
import { Image, StyleSheet, View, Text, Button } from "react-native";
import ParkingSpot from "../ParkingSpot";
// import "./styles.js";

function ParkingSpotList({ parkingSpots }) {
  return (
    <View>
      {parkingSpots.map((parkingSpot) => (
        <ParkingSpot key={parkingSpot.id} parkingSpot={parkingSpot} />
      ))}
    </View>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  costText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ParkingSpotList;
