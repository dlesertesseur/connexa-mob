import i18n from "../Config/i18n";
import CustomTextInput from "../Components/CustomTextInput";
import CustomButton from "../Components/CustomButton";
import CustomLabel from "../Components/CustomLabel";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import React from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../DataAccess/SignUpDao";
import { showAlert } from "../Util";
import { signIn } from "../Features/Auth";
import { useRef } from "react";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [creating, setCreating] = useState(null);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
    },
  });

  const onSubmit = (data) => {
    // signUp(data)
    //   .then((res) => {
    //     const params = {
    //       email: data.email,
    //       password: data.password,
    //     };
    //     dispatch(signIn(params));
    //   })
    //   .catch((error) => {
    //     showAlert(i18n.t("title.error"), error.toString(), () => {
    //       console.log("signUp ERROR CLOSE");
    //     });
    //   });
  };

  const logo = require("../../assets/images/logo-banner.png");

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />

      <CustomLabel
        title={i18n.t("title.screen.signUp")}
        text={i18n.t("title.screen.signUp-desc")}
        fontSize={30}
        color={colors.primary}
      />

      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"}>
          <HorizontalSeparator height={30} />
          <View style={styles.panel}>
            <CustomTextInput
              disabled={creating}
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
            />
            {/* <HorizontalSeparator />
            <CustomTextInput
              control={control}
              name="firstName"
              placeholder={i18n.t("label.firstName")}
              rules={{
                required: i18n.t("validation.required"),
              }}
            />
            <HorizontalSeparator />
            <CustomTextInput
              control={control}
              name="lastName"
              placeholder={i18n.t("label.lastName")}
              rules={{
                required: i18n.t("validation.required"),
              }}
            /> */}
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
              password={true}
            />
            <HorizontalSeparator />
            {/* <CustomTextInput
              control={control}
              name="phoneNumber"
              placeholder={i18n.t("label.phoneNumber")}
              rules={{
                required: i18n.t("validation.required"),
              }}
            /> */}
            <CustomTextInput
              control={control}
              name="checkPassword"
              placeholder={i18n.t("label.checkPassword")}
              rules={{
                required: i18n.t("validation.required"),
                minLength: {
                  value: 8,
                  message: i18n.t("validation.password.minLength"),
                },
                validate: (val) => {
                  if (val !== getValues("password")) {
                    return i18n.t("validation.password.distinct");
                  }
                },
              }}
              password={true}
            />

            <HorizontalSeparator />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.btPanel}>
        <CustomButton text={i18n.t("button.signUp")} onPress={handleSubmit(onSubmit)} />
      </View>
      {creating ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  panel: {
    marginHorizontal: 15,
  },

  btPanel: {
    marginHorizontal: 15,
    marginBottom: 15,
  },

  logo: {
    marginTop: 30,
    //marginBottom: 30,
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
