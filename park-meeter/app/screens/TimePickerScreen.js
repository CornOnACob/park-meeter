import React, { useState, useContext } from "react";
import { ParkingContext } from "../contexts/ParkingContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, Button, TextInput, Text  } from "react-native";
import { parkingService } from "../../services/parkingService";
import moment from "moment";

function TimePickerScreen (props) {

  // const [start, setStart] = useState(moment().seconds(0).milliseconds(0).toDate());
  // const [end, setEnd] = useState(moment().seconds(0).milliseconds(0).toDate());
  const [start, setStart] = useState(new Date(0, 0, 0, 12));
  const [end, setEnd] = useState(new Date(0, 0, 0, 13));

  const { selectedParking } = useContext(ParkingContext);

  const [duration, setDuration] = useState(1);

  const onChangeStart = (event, newStart) => {
    setStart(newStart);
    //setDuration(moment.duration(moment(newDate).diff(moment(end))));
    setDuration(moment.duration(moment(end).diff(moment(newStart))).asHours());
  };

  const onChangeEnd = (event, newEnd) => {
    setEnd(newEnd);
    //setDuration(moment.duration(moment(start).diff(moment(newEnd))));
    setDuration(moment.duration(moment(newEnd).diff(moment(start))).asHours());
  };

  return (
      <View style={styles.background}>
        <Text style={styles.price}>Total: ${(duration * (selectedParking.cost / 100)).toFixed(2)}</Text>
        <Text style={styles.hourlyRate}>(${(selectedParking.cost / 100).toFixed(2)}/h)</Text>
        {/* <DateTimePicker
          minuteInterval={15}
          //testID="dateTimePicker"
          value={new Date()}
          mode={"time"}
          //is24Hour={true}
          display="spinner"
          //onChange={onChangeStart}
          //onChange={onChange}
        /> */}
        <Text style={styles.description}>From:</Text>
        <DateTimePicker
          testID="startPicker"
          minuteInterval={15}
          value={start}
          mode={'time'}
          display="spinner"
          is24Hour={true}
          onChange={onChangeStart}
        />
        {/* <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        /> */}
        <Text style={styles.description}>To:</Text>
        <DateTimePicker
          testID="endPicker"
          minuteInterval={15}
          value={end}
          mode={'time'}
          display="spinner"
          is24Hour={true}
          onChange={onChangeEnd}
        />
        {/* <DateTimePicker
          minuteInterval={15}
          //testID="dateTimePicker"
          value={new Date()}
          mode={"time"}
          //is24Hour={true}
          display="spinner"
          //onChange={onChangeEnd}
        /> */}
        <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>
        <View style={styles.submitButton}>
          <Button
            onPress={() => props.navigation.navigate('Payment', {amount: duration * selectedParking.cost})}
            title="SUBMIT"
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute"
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  price: {
    //padding: 35,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  hourlyRate: {
    paddingTop: 5,
    paddingBottom: 30,
    textAlign: "center",
    fontSize: 22,
  },
  description: {
    textAlign: "center",
    fontSize: 22,
    //padding: 5,
    // fontWeight: "bold",
  },
  submitButton: {
    padding: 30,
  },
})

export default TimePickerScreen;
