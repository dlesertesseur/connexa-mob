import React from "react";
import { Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const CustomTextRequirement = ({ textAlign = "center", marginHorizontal = 15, text = null }) => {
  return (
    <View
      style={{
        alignItems: textAlign,
      }}
    >
      <View
        style={{
          marginHorizontal: marginHorizontal,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="notification-important" size={20} color={colors.primary} />
        </View>

        <Text
          style={{
            marginLeft: 5,
            color: colors.primary,
            //fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default CustomTextRequirement;
