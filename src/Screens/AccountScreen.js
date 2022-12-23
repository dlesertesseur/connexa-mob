import i18n from "../Config/i18n";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomAvatar from "../Components/CustomAvatar";
import CustomTextInput from "../Components/CustomTextInput";
import CustomPhoneInput from "../Components/CustomPhoneInput";
import CustomDateInput from "../Components/CustomDateInput";
import CustomButton from "../Components/CustomButton";
import CustomTitleBar from "../Components/CustomTitleBar";
import { colors } from "../Styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetAuthData } from "../Features/Auth";
import { useState } from "react";
import { API } from "../Config/Api";
import { ui } from "../Config/Constants";

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(false);
  const { user } = useSelector((state) => state.auth.value);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      names: user.firstname,
      surnames: user.lastname,
      email: user.email,
      address: user.address,
      dateOfBirth: user.birthDate,
      phoneNumber: user.phone,
    },
  });

  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.account")} avatar={false} />

      {/* <HorizontalSeparator />
      <CustomText title={i18n.t("title.screen.account")} fontSize={28} color={colors.primary} />
      <HorizontalSeparator /> */}

      <CustomAvatar size={150} image={API.document.baseImageUrl + user.image} />

      <ScrollView>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "position"}>
          <HorizontalSeparator height={30} />
          <View style={styles.panel}>
            <CustomTextInput
              editable={editData}
              control={control}
              name="names"
              placeholder={i18n.t("label.names")}
              rules={{
                required: i18n.t("validation.required"),
              }}
              getIcon={(error) => {
                return <FontAwesome5 name="user-alt" size={24} color={error ? colors.error : colors.primary} />;
              }}
            />
            <HorizontalSeparator />

            <CustomTextInput
              editable={editData}
              control={control}
              name="surnames"
              placeholder={i18n.t("label.surnames")}
              rules={{
                required: i18n.t("validation.required"),
              }}
              getIcon={(error) => {
                return <FontAwesome5 name="user-alt" size={24} color={error ? colors.error : colors.primary} />;
              }}
            />
            <HorizontalSeparator />

            <CustomTextInput
              editable={editData}
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
                return <MaterialIcons name="email" size={24} color={error ? colors.error : colors.primary} />;
              }}
            />

            <HorizontalSeparator />
            <CustomPhoneInput
              editable={editData}
              control={control}
              name="phoneNumber"
              placeholder={i18n.t("label.phoneNumber")}
              rules={{
                required: i18n.t("validation.required"),
              }}
            />
            <HorizontalSeparator />

            <CustomTextInput
              editable={editData}
              control={control}
              name="address"
              placeholder={i18n.t("label.address")}
              rules={{
                required: i18n.t("validation.required"),
              }}
              getIcon={(error) => {
                return <Entypo name="address" size={24} color={error ? colors.error : colors.primary} />;
              }}
            />
            <HorizontalSeparator />

            <CustomDateInput
              editable={editData}
              control={control}
              name="dateOfBirth"
              rules={{
                required: i18n.t("validation.required"),
              }}
            />

            <HorizontalSeparator />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.btPanel}>
          <CustomButton
            text={i18n.t("button.logout")}
            onPress={() => {
              dispatch(resetAuthData());
            }}
          />
        </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  panel: {
    marginHorizontal: 15,
  },

  bodyPanel: {
    marginBottom: 85,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  btPanel: {
    flex: 1,
    justifyContent:"flex-end",
    marginHorizontal: ui.margin,
    marginBottom: ui.tabBar.height + ui.margin,
  },
});
