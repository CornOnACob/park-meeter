import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  buyButton: {
    height: 125,
    display: "flex",
    padding: 12,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export const minimalMapStyle = [
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
