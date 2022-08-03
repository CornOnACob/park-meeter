import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  notSelected: {
    width: 50,
    height: 50,
  },
  selected: {
    width: 70,
    height: 70,
    shadowOpacity: 1,
    shadowRadius: 2.5,
    shadowOffset: {
      width: 4,
      height: 1,
    }
  },
  parkingPreview: {
    width: 150,
    height: 100,
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
  parkingCallout: {
    width: 200,
  },
});
