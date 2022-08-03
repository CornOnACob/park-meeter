import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "gray",
    textAlign: "center",
    fontSize: 30,
  },
  errorHeader: {
    color: "red",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorMessage: {
    padding: 15,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
})
