import React from "react";
import { Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";

const CustomBadge = ({
  text,
  fontSize = 16,
  textAlign = "center",
  marginHorizontal = 0,
  color = colors.secondary,
  bgColor = colors.primary,
  borderColor = null,
  iconName = null,
}) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderRadius: 24,
        paddingVertical: 2,
        borderWidth: borderColor ? 1 : 0,
        borderColor: borderColor ? borderColor : bgColor,
        justifyContent: "center",
        alignContent: "center",
        height: 28,
      }}
    >
      <View
        style={{
          marginHorizontal: marginHorizontal,
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            height: "100%",
            marginLeft: iconName ? 5 : 10,
            marginRight: iconName ? 2 : 0,
          }}
        >
          {iconName ? <MaterialIcons name={iconName} size={16} color={color} /> : null}
        </View>
        {text ? (
          <Text
            style={{
              fontSize: fontSize,
              color: color,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            {text}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default CustomBadge;
