import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  backButton: {
    position: "absolute"
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  price: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  hourlyRate: {
    paddingTop: 5,
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
  description: {
    textAlign: "center",
    fontSize: 22,
  },
  chooseTimeText: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 30,
    paddingBottom: 10,
  },
  submitButton: {
    padding: 20,
    paddingBottom: 35,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
