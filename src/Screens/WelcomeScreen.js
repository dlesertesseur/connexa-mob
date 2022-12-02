import React, { useEffect, useRef } from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import CustomText from "../Components/CustomText";

const WelcomeScreen = ({ navigation }) => {
  const logo = require("../../assets/images/logo-banner.png");
  const jobsOferts = require("../../assets/images/joboffers.jpg");

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />
      <CustomText title={i18n.t("title.screen.welcome")} fontSize={28} color={colors.primary} />
      <HorizontalSeparator />
      <CustomText text={i18n.t("title.screen.welcome-desc")} fontSize={18} color={colors.primary} />
      <Image source={jobsOferts} style={styles.joboffers} resizeMode="contain" />

      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.welcome-signIn")}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        />
        <HorizontalSeparator />
        <CustomButton
          text={i18n.t("button.welcome-signUp")}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  logo: {
    marginTop: 30,
  },

  joboffers: {
    width: "100%",
  },

  panel: {
    marginHorizontal: 15,
  },
});
