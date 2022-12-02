import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomValue = ({value, style}) => {

  return (
    <View style={[styles.container, style]}>
      <Text
        style={{
          fontSize: 24,
          color: colors.primary,
          fontWeight: "bold",
        }}
      >
        {value}
      </Text>
    </View>
  );
};

export default CustomValue;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    //margin:15,
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
