import React from "react";
import CustomAvatar from "./CustomAvatar";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../Styles/Colors";
import { API } from "../Config/Api";

const CustomTitleBar = ({
  title,
  fontSize = 18,
  marginHorizontal = 15,
  fullWidth,
  color = colors.secondary,
  avatar = true,
  marginBottom = 15,
  position="relative"
}) => {
  const { user, profileImage } = useSelector((state) => state.auth.value);

  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: colors.primary,
        width: fullWidth ? "100%" : null,
        height: 64,
        //marginTop: 15,
        marginBottom: marginBottom,
        flexDirection: "row",
        justifyContent: "space-between",
        position: position
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
        <View style={{ marginEnd: 15, flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginHorizontal: 5, flexDirection: "column", alignItems: "flex-start" }}>
            <Text
              style={{
                fontSize: 10,
                color: colors.secondary,
                fontWeight: "bold",
              }}
            >
              {user.lastname}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: colors.secondary,
              }}
            >
              {user.firstname}
            </Text>
          </View>

          {/* <CustomAvatar size={42} image={API.document.baseImageUrl + user.image} /> */}
          <View style={{justifyContent: "center", alignItems: "center" }}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={{ width: 42, height: 42, borderRadius: 90 }} />
            ) : (
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 90,
                  backgroundColor: colors.cardBack,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator color={colors.primary} size={12} />
              </View>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CustomTitleBar;
