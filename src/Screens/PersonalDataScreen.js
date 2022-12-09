import i18n from "../Config/i18n";
import React from "react";
import CustomTextInput from "../Components/CustomTextInput";
import CustomButton from "../Components/CustomButton";
import CustomLabel from "../Components/CustomLabel";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomPhoneInput from "../Components/CustomPhoneInput";
import CustomDateInput from "../Components/CustomDateInput";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { setSignupData } from "../Features/Auth";

const PersonalDataScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      names: "",
      surnames: "",
      email: "",
      address: "",
      dateOfBirth: "",
      phoneNumber: "",
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

    dispatch(setSignupData(data));
    navigation.navigate("CheckCode");
  };

  const logo = require("../../assets/images/logo-banner.png");

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />

      <CustomLabel
        title={i18n.t("title.screen.personalData")}
        text={i18n.t("title.screen.personalData-desc")}
        fontSize={30}
        color={colors.primary}
      />

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
          <HorizontalSeparator height={30} />
          <View style={styles.panel}>
            <CustomTextInput
              control={control}
              name="names"
              placeholder={i18n.t("label.names")}
              rules={{
                required: i18n.t("validation.required"),
              }}
              getIcon={(error) => {
                return (
                  <FontAwesome5
                    name="user-alt"
                    size={24}
                    color={error ? colors.error : colors.primary}
                  />
                );
              }}
            />
            <HorizontalSeparator />

            <CustomTextInput
              control={control}
              name="surnames"
              placeholder={i18n.t("label.surnames")}
              rules={{
                required: i18n.t("validation.required"),
              }}
              getIcon={(error) => {
                return (
                  <FontAwesome5
                    name="user-alt"
                    size={24}
                    color={error ? colors.error : colors.primary}
                  />
                );
              }}
            />
            <HorizontalSeparator />

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
            <CustomPhoneInput
              control={control}
              name="phoneNumber"
              placeholder={i18n.t("label.phoneNumber")}
              rules={{
                required: i18n.t("validation.required"),
              }}
            />
            <HorizontalSeparator />

            <CustomTextInput
              control={control}
              name="address"
              placeholder={i18n.t("label.address")}
              rules={{
                required: i18n.t("validation.required"),
              }}
              getIcon={(error) => {
                return (
                  <Entypo
                    name="address"
                    size={24}
                    color={error ? colors.error : colors.primary}
                  />
                );
              }}
            />
            <HorizontalSeparator />

            <CustomDateInput
              control={control}
              name="dateOfBirth"
              rules={{
                required: i18n.t("validation.required"),
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
            <HorizontalSeparator />

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
              getIcon={(error) => {
                return (
                  <Octicons
                    name="key-asterisk"
                    size={24}
                    color={error ? colors.error : colors.primary}
                  />
                );
              }}
            />
            <HorizontalSeparator />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.btPanel}>
        <CustomButton
          text={i18n.t("button.continue")}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      {/* {creating ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null} */}
    </View>
  );
};

export default PersonalDataScreen;

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
