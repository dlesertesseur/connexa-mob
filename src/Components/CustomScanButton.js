import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomScanButton = ({ text, onPress, style, scanning }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.button} onPress={onPress} disabled={scanning}>
        <Text style={styles.text}> {text} </Text>
        {scanning ? <ActivityIndicator size="small" color={colors.secondary} /> : null}
      </TouchableOpacity>
    </View>
  );
};

export default CustomScanButton;

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
    flexDirection: "row",
    borderWidth: 0,
    backgroundColor: colors.primary,
  },

  text: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
  },
});
