import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../Styles/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ui } from "../Config/Constants";

const OptionItem = ({screenName, label, iconName, onPress}) => {;

  const onPressLocal = () => {
    onPress(screenName);
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.row} onPress={onPressLocal}>
        <View style={{marginBottom:15}}>
          <FontAwesome
            name={iconName}
            size={48}
            color={colors.secondary}
          />
        </View>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OptionItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 164,
    //width: 164,
    //borderWidth: 1,
    borderRadius: ui.borderRadius,
    margin: 10,
    //borderColor:colors.primaryDarker,
    backgroundColor: colors.primary,
  },

  text: {
    alignItems: "center",
    fontSize: 24,
    color: colors.secondary,
  },

  image: {
    width: 24,
    height: 24,
  },
});
