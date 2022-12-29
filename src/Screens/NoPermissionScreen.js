import React from "react";
import i18n from "../Config/i18n";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomText from "../Components/CustomText";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { ui } from "../Config/Constants";

const NoPermissionScreen = ({ navigation }) => {
  const logo = require("../../assets/images/logo-banner.png");

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />
      <CustomText title={i18n.t("title.screen.noPermission")} fontSize={28} color={colors.primary} />
      <HorizontalSeparator />
      <CustomText text={i18n.t("title.screen.noPermission-desc")} fontSize={18} color={colors.primary} />
    </View>
  );
};

export default NoPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  logo: {
    marginTop: 30,
  },

  picture: {
    resizeMode: "center",
  },

  panel: {
    flex: 1,
    margin: 15,
    justifyContent: "flex-end",
    marginBottom: ui.tabBar.height + ui.margin,
  },
});
