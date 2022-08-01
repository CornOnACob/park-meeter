import React from "react";
import { View, Text, Button } from "react-native";
import ParkingSpot from "../ParkingSpot";
// import "./styles.js";

function ParkingSpotList(props) {
  return (
    <View>
      {props.parkingSpots.map((parkingSpot) => (
        <ParkingSpot key={parkingSpot.id} parkingSpot={parkingSpot} />
      ))}
    </View>
  );
}

export default ParkingSpotList;
