import React from "react";
import { Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomTextTime = ({
  fontSize = 16,
  textAlign = "center",
  marginHorizontal = 15,
  start = "00:00",
  end = "00:00",
  icon = "clock" | "lunch",
  text = null,
}) => {
  const determinateIcon = (icon) => {
    let ret = null;
    switch (icon) {
      case "clock":
        ret = <FontAwesome5 name="clock" size={18} color={colors.primary} />;
        break;

      case "lunch":
        ret = <MaterialCommunityIcons name="silverware-fork-knife" size={18} color={colors.primary} />;
        break;

      default:
        break;
    }

    return ret;
  };

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
          {determinateIcon(icon)}
        </View>
        <Text
          style={{
            marginLeft: 5,
            fontSize: fontSize,
            color: colors.primary,
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          {start}
        </Text>
        <Text
          style={{
            fontSize: fontSize,
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          {"-"}
        </Text>

        <Text
          style={{
            fontSize: fontSize,
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          {end}
        </Text>

        {text ? (
          <Text
            style={{
              fontSize: 14,
              borderRadius: 50,
              color: colors.secondary,
              fontWeight: "bold",
              backgroundColor: colors.primary,
              marginStart: 20,
              paddingHorizontal: 8,
              justifyContent: "center",
            }}
          >
            {text}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default CustomTextTime;
