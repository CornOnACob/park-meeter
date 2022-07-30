import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  AnimatedRegion,
  Animated,
} from "react-native-maps";
import {
  Image,
  StyleSheet,
  Button,
  Text,
  View,
  Dimensions,
  TextInput,
} from "react-native";
// import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import { parkingService } from "./services/parkingService";
import ParkingSpotList from "./components/ParkingSpotList";

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

export default function App() {
  console.log("Executed!");

  const [parkingSpots, setParkingSpots] = useState([]);

  const getParking = async () => {
    console.log("Getting parking");
    const res = await parkingService.getParkingSpots();
    console.log(res);
    if (res) {
      setParkingSpots(res);
    } else {
      setErrorMsg("Unable to retrieve events from server");
    }
  };

  const logParking = () => {
    console.log(parkingSpots[0].image);
  };

  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // Geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log(position);
  //   },
  //   (error) => {
  //     // See error code charts below.
  //     console.log(error.code, error.message);
  //   },
  //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  // );

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

  useEffect(() => {
    getParking();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={logParking}
        title={parkingSpots.length + ""}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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
      >
        {parkingSpots && parkingSpots.length > 0 ? (
          <ParkingSpotList parkingSpots={parkingSpots} />
        ) : (
          // <Marker
          //   coordinate={{
          //     latitude: parkingSpots[0].coords.x,
          //     longitude: parkingSpots[0].coords.y,
          //   }}
          // >
          //   <Image
          //     style={styles.parkingSymbol}
          //     source={require("./app/assets/parking-symbol.png")}
          //   />
          // </Marker>
          <Marker
            // title="Title"
            // description="Desc"
            coordinate={{ latitude: 45.49074, longitude: -73.8146 }}
          >
            <Image
              style={styles.parkingSymbol}
              source={require("./app/assets/parking-symbol.png")}
            />
            <Callout>
              <View>
                <Text>Parking available</Text>
                <Image
                  style={styles.parkingPreview}
                  source={require("./app/assets/driveway1.jpg")}
                />
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      <StatusBar style="auto" />
      <View>
        <TextInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "dodgerblue", //'#fff',
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width, // * 0.8,
    height: Dimensions.get("window").height, // * 0.8,
  },
  parkingSymbol: {
    width: 50,
    height: 50,
  },
  parkingPreview: {
    width: 120,
    height: 80,
  },
});
