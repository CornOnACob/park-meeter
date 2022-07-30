import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, Button } from "react-native";

function TimePickerScreen (props) {
  return (
    <View style={styles.background}>
      <DateTimePicker
        testID="dateTimePicker"
        value={new Date()}
        mode={"time"}
        is24Hour={true}
        display="spinner"
        // onChange={onChange}
      />
      <DateTimePicker
        testID="dateTimePicker"
        value={new Date()}
        mode={"time"}
        is24Hour={true}
        display="spinner"
        // onChange={onChange}
      />
      <Button title="SUBMIT" />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center"
  }
})

export default TimePickerScreen;