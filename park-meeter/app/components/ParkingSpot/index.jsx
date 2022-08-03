import React, { useContext } from "react";
import { ParkingContext } from "../../contexts/ParkingContext.js";
import { Marker, Callout } from "react-native-maps";
import { Image, View, Text } from "react-native";
import { styles } from "./styles.js";

function ParkingSpot(props) {

  const { selectedParking, setSelectedParking } = useContext(ParkingContext);

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
    >
      <Image
        style={selectedParking !== null && props.parkingSpot.id === selectedParking.id ? styles.selected : styles.notSelected}
        source={require("../../assets/parking-symbol.png")}
      />
      <Callout style={styles.parkingCallout} >
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={styles.titleText}>{props.parkingSpot.name}</Text>
          <Text>{props.parkingSpot.description}</Text>
          <Text style={styles.costText}>
            ${(props.parkingSpot.cost / 100).toFixed(2)}/hour
          </Text>
          <Image
            style={styles.parkingPreview}
            source={{uri:`https://parkmeeter.s3.amazonaws.com/driveways/${props.parkingSpot.image}.jpg`}}
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

export default ParkingSpot;
