import React from "react";
import { Text, View } from "react-native";
import { colors } from "../Styles/Colors";

const CustomText = ({ title, text, fontSize = 16, textAlign = "center" }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: textAlign,
      }}
    >
      <View style={{ marginHorizontal: 15 }}>
        {title ? (
          <Text
            style={{
              fontSize: fontSize,
              color: colors.primary,
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
              flexWrap: 'wrap'
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
