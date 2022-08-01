import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, Button, StatusBar, View } from "react-native";
import * as Location from "expo-location";
import { parkingService } from "./services/parkingService";
import LoadingScreen from "./app/screens/LoadingScreen";
import MapScreen from "./app/screens/MapScreen";
import TimePickerScreen from "./app/screens/TimePickerScreen";
import PaymentScreen from "./app/screens/PaymentScreen";
import SuccessScreen from "./app/screens/SuccessScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ParkingContext } from './app/contexts/ParkingContext';

const Stack = createNativeStackNavigator();

export default function App() {

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);
  const [location, setLocation] = useState(null);

  const getParking = async () => {
    const res = await parkingService.getParkingSpots();
    if (res.length > 0) {
      setParkingSpots(res);
      setIsLoading(false);
    } else {
      setErrorMessage("Unable to fetch parking data from server");
    }
  };

  useEffect(() => {
    console.log('useEffect');
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        //setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    getParking();
  }, []);

  // return (
  //   <ErrorContext.Provider value={{errorMessage}}>
  //     <LoadingScreen />
  //   </ErrorContext.Provider>
  // )

  return (
    <NavigationContainer>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true} />
      <ParkingContext.Provider value={{selectedParking, setSelectedParking}}>
        <Stack.Navigator initialRouteName="Loading" screenOptions={{gestureEnabled: false}} >
          <Stack.Screen name="Loading" options={{ headerShown: false }}>
            {(props) => <LoadingScreen {...props} errorMessage={errorMessage} isLoading={isLoading} />}
          </Stack.Screen>
          <Stack.Screen name="Map" options={{ headerShown: false }}>
            {(props) => <MapScreen {...props} parkingSpots={parkingSpots} />}
          </Stack.Screen>
          <Stack.Screen name="TimePicker" component={TimePickerScreen} options={{ title: 'Pick a Time' /*headerShown: false*/ }} />
          <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Payment' /*headerShown: false*/ }} />
          <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ParkingContext.Provider>
    </NavigationContainer> 
  )
}
