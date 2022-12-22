import React from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import CustomLabel from "../Components/CustomLabel";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomSecurityCodeInput from "../Components/CustomSecurityCodeInput";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../Features/Auth";
import { useEffect } from "react";

const CheckCodeScreen = ({ navigation }) => {
  const { signupData, user } = useSelector((state) => state.auth.value);
  const { creating, created, error, errorMessage } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (created && !creating) {
      navigation.navigate("AccountCreatedSuccessfully");
    }
  }, [created, creating]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data) => {
    const send = { ...signupData };
    send.country = user.country;
    send.city = user.city;
    dispatch(signUp(send));
  };

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
        <CustomSecurityCodeInput
          disabled={creating}
          control={control}
          name="code"
          rules={{
            required: i18n.t("validation.required"),
          }}
        />
      </View>
      <View style={{ justifyContent: "flex-end", margin: 15 }}>
        <CustomButton text={i18n.t("button.continue")} onPress={handleSubmit(onSubmit)} />
      </View>
      {creating ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
      {error
        ? Alert.alert(i18n.t("title.error"), errorMessage, [
            {
              text: i18n.t("button.close"),
              style: "cancel",
            },
          ])
        : null}
    </View>
  );
};

export default CheckCodeScreen;

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
