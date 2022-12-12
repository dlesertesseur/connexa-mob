import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { colors } from "../Styles/Colors";

const CustomFloatingButton = ({ onPress, diameter = 48 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: diameter,
          height: diameter,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary,
        }}
        onPress={onPress}
      >
        <Feather name="plus" size={32} color={colors.secondary}/>
      </TouchableOpacity>
    </View>
  );
};

export default CustomFloatingButton;

const styles = StyleSheet.create({
  container: {},
});
