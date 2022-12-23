import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { colors } from "../Styles/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ui } from "../Config/Constants";

const OptionItem = ({ item, index, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: "25%",
        height: 100,
      }}
      onPress={onPress}
    >
      <View
        style={{
          // marginRight: index % 4 === 0 ? 5 : 0,
          // marginLeft: index % 4 > 0 ? 5 : 0,
          marginHorizontal: 4,
          marginBottom: 8,
          flex: 1,
          padding: 0,
          borderColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
          borderRadius: ui.borderRadius,
          borderWidth: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              flex: 0.5,
              marginTop:5
            }}
          >
            <Text
              style={{
                fontSize: 10,
                color: colors.primary,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {item.option}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <MaterialCommunityIcons
              name={item.iconName}
              size={28}
              color={colors.primary}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OptionItem;

const styles = StyleSheet.create({});
