import React from "react";
import CenterTextScreen from "../Components/CenterTextScreen";
import { StyleSheet } from "react-native";
import { colors } from "../Styles/Colors";

const TimeAndAttendanceScreen = () => {
  return <CenterTextScreen text={"Time And Attendance"} backgroundColor={colors.secondary}/>;
};

export default TimeAndAttendanceScreen;

const styles = StyleSheet.create({});
