import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomLink = ({ text, onPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text} > {text} </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomLink;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  text: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "bold",
  },
});
