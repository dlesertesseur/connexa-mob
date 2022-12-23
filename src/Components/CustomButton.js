import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";

const CustomButton = ({ text, onPress, style, disabled = false, loading=false }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={{
          flexDirection:"row",
          width: "100%",
          height: 50,
          borderRadius: ui.borderRadius,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 0,
          backgroundColor: disabled || loading ? colors.inactive : colors.primary,
        }}
        onPress={onPress}
        disabled={disabled || loading}
      >
        <Text style={styles.text}> {text} </Text>
        {loading ? 
        <ActivityIndicator size={24} color={colors.primaryLighter} style={{marginStart:10}}/> : null}
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

  text: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
  },
});
