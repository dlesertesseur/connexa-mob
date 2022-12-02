import React, { useState } from "react";
import CustomTextInput from "../../Components/CustomTextInput";
import CustomButton from "../../Components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import CustomLabel from "../../Components/CustomLabel";
import CustomTextAreaInput from "../../Components/CustomTextAreaInput";
import ImageList from "../../Components/ImageList";
import i18n from "../../Config/i18n";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../Styles/Colors";
import { useSelector } from "react-redux";

const AlertScreen = ({ route, navigation }) => {
  const { location } = useSelector((state) => state.alert.value);
  const [pictures, setPictures] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      desription: "",
      location: "",
    },
  });

  const getPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync;
    {
      return false;
    }
    return true;
  };

  const onTakePhoto = async () => {
    // // const isVerified = getPermission();
    // // if (!isVerified) {
    // //   console.log("###### onTakePhoto -> isVerified:" + isVerified);
    // //   return;
    // // }

    // const image = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 1,
    // });

    // setPictures([...pictures, image.uri]);
    navigation.navigate("cameraTest");
  };

  const onSelectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPictures([...pictures, result.uri]);
    }
  };

  const onSubmit = (data) => console.log(data);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.scrollview}
    >
      <View style={styles.container}>
        <CustomLabel
          style={styles.fieldLabel}
          title={i18n.t("title.screen.alert")}
          text={i18n.t("title.screen.alert-desc")}
          fontSize={30}
          color={colors.primary}
        />

        <View style={styles.panel}>
          <CustomTextInput
            style={styles.field}
            control={control}
            name="tile"
            placeholder={i18n.t("label.title")}
            rules={{
              required: i18n.t("validation.required"),
            }}
          />

          <CustomTextAreaInput
            style={styles.field}
            control={control}
            name="description"
            placeholder={i18n.t("label.description")}
            rules={{
              required: i18n.t("validation.required"),
            }}
          />

          <CustomButton
            style={styles.field}
            text={location ? location : i18n.t("label.location")}
            onPress={() => {
              navigation.navigate("scanLocationScreen", {
                barCode: true,
                qrCode: false,
                back:"alertScreen"
              });
            }}
          />

          <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
            <CustomButton
              style={{ flex: 0.5, marginRight: 3 }}
              text={i18n.t("button.addPicture")}
              onPress={onSelectPhoto}
            />
            <CustomButton
              style={{ flex: 0.5, marginLeft: 3 }}
              text={i18n.t("button.takePicture")}
              onPress={onTakePhoto}
            />
          </View>

          {pictures.length > 0 ? <ImageList pictures={pictures} /> : null}

          <CustomButton
            style={{ marginBottom: 15, marginTop: 15 }}
            text={i18n.t("button.send")}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AlertScreen;

const styles = StyleSheet.create({
  scrollview: {
    marginBottom: 80,
  },
  container: {
    backgroundColor: colors.background,
  },

  field: {
    marginBottom: 15,
  },

  fieldButton: {
    marginBottom: 30,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  logo: {
    marginTop: 64,
    marginBottom: 30,
  },

  panel: {
    // borderRadius: 12,
    //backgroundColor: colors.secondary,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },

  fieldLabel: {
    paddingHorizontal: 0,
    paddingTop: 5,
  },
});
