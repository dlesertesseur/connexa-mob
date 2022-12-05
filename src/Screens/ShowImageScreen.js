import React from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import CustomLabel from "../Components/CustomLabel";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";

const ShowImageScreen = ({ navigation }) => {
  // const onSubmit = (data) => {
  //   navigation.navigate("AccountCreatedSuccessfully");
  // };

  const logo = require("../../assets/images/logo-banner.png");

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />
      <CustomLabel
        title={i18n.t("title.screen.checkCode")}
        text={i18n.t("title.screen.checkCode-desc")}
        fontSize={30}
        color={colors.primary}
      />
      <HorizontalSeparator height={64} />
      <View style={styles.panel}>
        <Text> ShowImageScreen </Text>
      </View>
      <View style={{ justifyContent: "flex-end", margin: 15 }}>
        <CustomButton
          text={i18n.t("button.continue")}
          onPress={()=>{console.log("ShowImageScreen")}}
        />
      </View>
      
    </View>
  );
};

export default ShowImageScreen;

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

  panel: {
    flex: 1,
    marginHorizontal: 15,
  },

  forgotPassword: {
    height: 40,
    alignItems: "flex-end",
    marginBottom: 30,
    color: colors.secondary,
  },

  signup: {
    height: 40,
    alignItems: "center",
  },

  fieldLabel: {
    padding: 15,
  },

  loading: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
