import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { API } from "../Config/Api";
import { colors } from "../Styles/Colors";
import CustomAvatar from "./CustomAvatar";

const CustomTitleBar = ({
  title,
  fontSize = 18,
  marginHorizontal = 15,
  fullWidth,
  color = colors.secondary,
  avatar = true,
  marginBottom = 15
}) => {
  const { user } = useSelector((state) => state.auth.value);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.primary,
        width: fullWidth ? "100%" : null,
        height: 64,
        marginTop: 15,
        marginBottom: marginBottom,
        flexDirection: "row",
        justifyContent: "space-between",
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
            {title.toUpperCase()}
          </Text>
        ) : null}
      </View>
      {avatar ? (
        <View style={{ marginEnd: 15 }}>
          <CustomAvatar size={42} image={API.document.baseImageUrl + user.image} />
        </View>
      ) : null}
    </View>
  );
};

export default CustomTitleBar;
