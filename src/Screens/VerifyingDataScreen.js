import React from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomText from "../Components/CustomText";
import { Image, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch } from "react-redux";
import { resetAuthData } from "../Features/Auth";

const VerifyingDataScreen = ({ navigation }) => {
  const logo = require("../../assets/images/logo-banner.png");
  const checkingImg = require("../../assets/images/checking.png");
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />
      <CustomText title={i18n.t("title.screen.verifyingData")} fontSize={28} color={colors.primary} />
      <HorizontalSeparator />
      <CustomText text={i18n.t("title.screen.verifyingData-desc")} fontSize={18} color={colors.primary} textAlign={"center"}/>
     
      <View style={styles.imgPanel}>
        <Image source={checkingImg} style={styles.picture} />
      </View>

      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.close")}
          onPress={() => {
            dispatch(resetAuthData());
          }}
        />
      </View>
    </View>
  );
};

export default VerifyingDataScreen;

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
    margin: 15,
    justifyContent: "flex-end",
  },

  imgPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
