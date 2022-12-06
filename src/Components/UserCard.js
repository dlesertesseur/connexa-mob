import React from "react";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomAvatar from "../Components/CustomAvatar";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { ui } from "../Config/Constants";

const UserCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bodyPanel}>
        <HorizontalSeparator />
        <CustomAvatar size={150} />
        <HorizontalSeparator />
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },

  panel: {
    margin: 15,
    justifyContent: "flex-end",
  },

  bodyPanel: {
    //height: 160,
    // justifyContent: "center",
    // alignItems: "flex-start",
    // borderRadius: ui.borderRadius,
    // borderColor: "#ff0000",
    // borderWidth: 1,
    // alignItems: "flex-start",
    // padding: 5,
    // flexDirection: "row",
  },

  dataPanel: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: ui.borderRadius,
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: "flex-start",
    padding: 5,
    margin: 5,
  },
});
