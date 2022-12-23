import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomLink = ({ text, onPress, style, disabled }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text
          style={{
            fontSize: 18,
            color: !disabled ? colors.primary : colors.fontDisabled,
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
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
});
