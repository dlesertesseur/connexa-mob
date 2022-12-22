import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { toHoursAndMinutes, zeroPad } from "../Util";

const Stopwatch = ({ seconds=0 }) => {

  const converSegToString = () => {
    const ret = toHoursAndMinutes(seconds);
    const sz = zeroPad(ret.h, 2) + ":" + zeroPad(ret.m, 2) + ":" + zeroPad(ret.s, 2);
    return(sz);
  }

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
          {converSegToString()}
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
