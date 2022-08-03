import React, { useState, useContext } from "react";
import { ParkingContext } from "../../contexts/ParkingContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Button, Text  } from "react-native";
import moment from "moment";
import { styles } from "./styles.js";

function TimePickerScreen (props) {

  const [start, setStart] = useState(new Date(0, 0, 0, 12));
  const [end, setEnd] = useState(new Date(0, 0, 0, 13));

  const { selectedParking } = useContext(ParkingContext);

  const parkStartTime = selectedParking.start_time.split(":");
  const parkStartHours = parkStartTime[0];
  const parkStartMins = parkStartTime[1];
  const parkStart = new Date(0, 0, 0, parkStartHours, parkStartMins);
  const startTime = moment(parkStart);

  const partEndTime = selectedParking.end_time.split(":");
  const parkEndHours = partEndTime[0];
  const parkEndMins = partEndTime[1];
  const parkEnd = new Date(0, 0, 0, parkEndHours, parkEndMins);
  const endTime = moment(parkEnd);

  startTime.subtract(moment.duration("04:00:00")); //Set to Montreal timezone
  endTime.subtract(moment.duration("04:00:00")); //Set to Montreal timezone

  const timePickerMin = moment(startTime).toDate();
  const timePickerMax = moment(endTime).toDate();

  const startMax = endTime;
  startMax.subtract(moment.duration("00:15:00"));
  const endMin = startTime;
  endMin.add(moment.duration("00:15:00"));

  const [startMaxTime, setStartMaxTime] = useState(startMax);
  const [endMinTime, setEndMinTime] = useState(endMin);

  const [duration, setDuration] = useState(1);

  const onChangeStart = (event, newStart) => {
    setStart(newStart);
    setDuration(moment.duration(moment(end).diff(moment(newStart))).asHours());

    const newMin = moment(newStart);
    newMin.add(moment.duration("00:15:00"));
    setEndMinTime(newMin);
  };

  const onChangeEnd = (event, newEnd) => {
    setEnd(newEnd);
    setDuration(moment.duration(moment(newEnd).diff(moment(start))).asHours());

    const newMax = moment(newEnd);
    newMax.subtract(moment.duration("00:15:00"));
    setStartMaxTime(newMax);
  };

  return (
      <View style={styles.background}>
        <Text style={styles.hourlyRate}>${(selectedParking.cost / 100).toFixed(2)} / hour</Text>
        <Text style={styles.price}>Total: ${(duration * (selectedParking.cost / 100)).toFixed(2)}</Text>
        <Text style={styles.chooseTimeText}>Available {moment(timePickerMin).format('h:mma')} to {moment(timePickerMax).format('h:mma')}</Text>
        <DateTimePicker
          testID="startPicker"
          minuteInterval={15}
          value={start}
          mode={'time'}
          display="spinner"
          is24Hour={true}
          onChange={onChangeStart}
          minimumDate={timePickerMin}
          maximumDate={moment(startMaxTime).toDate()}
        />
        <Text style={styles.description}>To:</Text>
        <DateTimePicker
          testID="endPicker"
          minuteInterval={15}
          value={end}
          mode={'time'}
          display="spinner"
          is24Hour={true}
          onChange={onChangeEnd}
          minimumDate={moment(endMinTime).toDate()}
          maximumDate={timePickerMax}
        />
        <View style={styles.line} />
        <View style={styles.submitButton}>
          <Button
            onPress={() => props.navigation.navigate('Payment', {amount: duration * selectedParking.cost})}
            title="SUBMIT"
          />
        </View>
      </View>
  )
}

export default TimePickerScreen;
