import React from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import CustomLabel from "../Components/CustomLabel";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import { Alert, Image, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { ui } from "../Config/Constants";
import { uploadWorkerImage } from "../DataAccess/DocumentsDao";
import { useDispatch, useSelector } from "react-redux";
import { updatedDocument } from "../Features/Auth";

const ShowImageScreen = ({ navigation }) => {
  const logo = require("../../assets/images/logo-banner.png");
  const noData = require("../../assets/images/noData.png");
  const dispatch = useDispatch();
  const { user, document } = useSelector((state) => state.auth.value);

  const saveDocument = () => {
    const params = {
      id: user.id,
      token: user.token,
      type: document.name,
      file: document.url,
    };

    uploadWorkerImage(params).then((ret) => {
      if (ret.error) {
        Alert.alert(i18n.t("title.error"), i18n.t("errors.savePhoto"), [
          {
            text: i18n.t("button.close"),
            style: "cancel",
          },
        ]);
      } else {

        dispatch(updatedDocument());
        navigation.navigate("DocumentsList");
      }
    });
  };

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />
      <CustomLabel title={document.labelText} text={document.description} fontSize={30} color={colors.primary} />
      <HorizontalSeparator />

      <View style={styles.panel}>
        <Image source={document.url ? { uri: document.url } : noData} resizeMode={"cover"} style={styles.image} />
      </View>

      <View style={{ justifyContent: "flex-end", margin: 15 }}>
        <CustomButton
          text={i18n.t("button.takePicture")}
          onPress={() => {
            navigation.navigate("TakePhoto");
          }}
        />

        <HorizontalSeparator />

        <CustomButton text={i18n.t("button.save")} onPress={saveDocument} />
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
    borderRadius: ui.borderRadius,
  },

  logo: {
    marginTop: 30,
  },

  panel: {
    flex: 1,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 0,
    borderRadius: ui.borderRadius,
    borderWidth: ui.borderWidth,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
