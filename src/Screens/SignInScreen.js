import React from "react";
import i18n from "../Config/i18n";
import CustomTextInput from "../Components/CustomTextInput";
import CustomButton from "../Components/CustomButton";
import CustomLabel from "../Components/CustomLabel";
import CustomImage from "../Components/CustomImage";
import CustomLink from "../Components/CustomLink";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../Features/Auth";

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, errorMessage, authenticating } = useSelector(
    (state) => state.auth.value
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(signIn(data));
  };

  const logo = require("../../assets/images/logo-banner.png");

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />
      <CustomLabel
        title={i18n.t("title.screen.login")}
        text={i18n.t("title.screen.login-desc")}
        fontSize={30}
        color={colors.primary}
      />
      <HorizontalSeparator height={64} />
      <View style={styles.panel}>
        <CustomTextInput
          control={control}
          name="email"
          placeholder={i18n.t("label.email")}
          rules={{
            required: i18n.t("validation.required"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: i18n.t("validation.email.invalid"),
            },
          }}
          getIcon={(error) => {
            return (
              <MaterialIcons
                name="email"
                size={24}
                color={error ? colors.error : colors.primary}
              />
            );
          }}
        />
        <HorizontalSeparator />
        <CustomTextInput
          control={control}
          name="password"
          placeholder={i18n.t("label.password")}
          rules={{
            required: i18n.t("validation.required"),
            minLength: {
              value: 8,
              message: i18n.t("validation.password.minLength"),
            },
          }}
          getIcon={(error) => {
            return (
              <Octicons
                name="key-asterisk"
                size={24}
                color={error ? colors.error : colors.primary}
              />
            );
          }}
          password={true}
        />

        <CustomLink
          text={i18n.t("label.forgotPassword")}
          style={styles.forgotPassword}
        />
      </View>

      <HorizontalSeparator />

      {authenticating ? (
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

      <View style={{ flex: 1, margin: 15, justifyContent: "flex-end" }}>
        <CustomButton
          text={i18n.t("button.login")}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default SignInScreen;

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
    //marginBottom: 30,
  },

  panel: {
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
