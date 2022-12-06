import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../Styles/Colors";
import { ui } from "../Config/Constants";

const ActionButton = ({iconName, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "flex-end",
        backgroundColor: colors.primary,
        margin: 12,
        padding:6,
        borderRadius: ui.borderRadius,
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={32}
        color={colors.secondary}
      />
    </TouchableOpacity>
  );
};

export default ActionButton;
