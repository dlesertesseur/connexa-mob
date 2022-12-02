import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomButton = ({ text, onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}> {text} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    backgroundColor: colors.primary,
  },

  text: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
  },
});
