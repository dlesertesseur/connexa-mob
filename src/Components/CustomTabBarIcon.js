import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../Styles/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const CustomTabBarIcon = ({ text, focused = false, iconName }) => {
  return (
    <View style={styles.item}>
      <FontAwesome5
        name={iconName}
        size={24}
        color={focused ? colors.secondary : colors.primaryLighter}
      />
      {text ? (
        <Text
          style={[focused ? styles.textFocused : styles.text]}
        >
          {text}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: colors.primaryLighter,
  },

  textFocused: {
    color: colors.secondary,
  },
});

export default CustomTabBarIcon;
