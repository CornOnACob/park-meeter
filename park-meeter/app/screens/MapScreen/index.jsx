import React, { useContext } from "react";
import { ParkingContext } from "../../contexts/ParkingContext";
import { View, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import ParkingSpotList from "../../components/ParkingSpotList";
import { styles, minimalMapStyle } from "./styles.js";

function MapScreen (props) {

  const { selectedParking } = useContext(ParkingContext);

  const mapRef = React.createRef();

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
        customMapStyle={minimalMapStyle}
        initialRegion={{
          latitude: 45.55877737048191,
          longitude: -73.5483988894613,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <ParkingSpotList parkingSpots={props.parkingSpots} />
      </MapView>
    </View>
  )
}

export default MapScreen;
