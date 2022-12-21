import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { toHoursAndMinutes } from "../Util";

const Stopwatch = ({ seconds }) => {
  return (
    <View style={styles.container}>
      <View style={{marginHorizontal:15}}>
        <Text
          style={{
            fontSize: 48,
            color: colors.secondary,
            //fontWeight: "bold",
          }}
        >
          {toHoursAndMinutes(seconds)}
        </Text>
      </View>
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
