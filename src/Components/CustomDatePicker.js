import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ style}) => {

  const [date, setDate] = useState(Date.now());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePicker.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (
    <View style={[styles.container, style]}>

    </View>
  );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.secondary
  },

  text: {
    fontSize: 24,
    color: colors.secondary,
    fontWeight: "bold",
  },
});
