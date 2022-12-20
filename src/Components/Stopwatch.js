import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";

const Stopwatch = ({ data = "00:00:00"}) => {
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
          {data}
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
