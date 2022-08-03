import React from "react";
import { View } from "react-native";
import ParkingSpot from "../ParkingSpot";

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
