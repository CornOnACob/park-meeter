import React, { useState, useContext } from "react";
import { ParkingContext } from "../contexts/ParkingContext";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Text,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import ParkingSpotList from "../../app/components/ParkingSpotList";

const minimalMapStyle = [
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

function MapScreen (props) {

  const { selectedParking, setSelectedParking } = useContext(ParkingContext);

  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const mapRef = React.createRef();

  const goToMyLocation = async () => {
    console.log(location.coords.latitude, "lat");
    console.log(location.coords.longitude, "long");
    console.log(location, "LOCATION");
    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  };

  // goToMyLocation();

  return (
    <View style={styles.container}>
      <View style={styles.buyButton}>
        <Button
          title="RESERVE THIS PARKING"
          disabled={!selectedParking}
          onPress={() => props.navigation.navigate('TimePicker')}
        />
      </View>
      <MapView
        ref={mapRef}
        loadingEnabled={true}
        style={styles.map}
        // customMapStyle={minimalMapStyle}
        initialRegion={{
          latitude: 45.55877737048191,
          longitude: -73.5483988894613,
          latitudeDelta: 0.05, //0.0922,
          longitudeDelta: 0.02, //0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        onPress={() => selectedParking ? setSelectedParking(null) : console.log('N/A') }
        // onPress={() => console.log('PRESS MAP')}
        onMarkerPress={() => console.log('PRESS MARKER')}
      >
        
        <ParkingSpotList parkingSpots={props.parkingSpots} />
        
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  buyButton: {
    height: 125,
    // height: 250,
    display: "flex",
    padding: 12,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
