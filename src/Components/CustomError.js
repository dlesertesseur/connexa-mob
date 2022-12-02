import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomError = ({ title, text, fontSize = 18 }) => {

  return (
    <View style={[styles.container]}>
      <Text
        style={{
          fontSize: 24,
          color: colors.errorText,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: colors.errorText,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default CustomError;

const styles = StyleSheet.create({
  container: {
    borderRadius:10,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    margin:15,
    backgroundColor: colors.error,
  },

  text: {
    fontSize: 24,
    color: colors.secondary,
    fontWeight: "bold",
  },
});
