import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../Styles/Colors";

const ActionButton = ({iconName, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "flex-end",
        backgroundColor: colors.primary,
        margin: 12,
        padding:6,
        borderRadius: 6,
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
