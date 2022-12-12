import React from "react";
import { Text, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomText = ({
  title,
  text,
  fontSize = 16,
  textAlign = "center",
  marginHorizontal = 15,
  fullWidth,
  color = colors.primary,
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: textAlign,
        width: fullWidth ? "100%" : null,
      }}
    >
      <View style={{ marginHorizontal: marginHorizontal }}>
        {title ? (
          <Text
            style={{
              fontSize: fontSize,
              color: color,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        ) : null}

        {text ? (
          <Text
            style={{
              fontSize: fontSize,
              color: colors.primary,
              flexWrap: "wrap",
            }}
          >
            {text}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default CustomText;
