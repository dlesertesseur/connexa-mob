import React, { useEffect, useRef, useState } from "react";
import CustomTextInput from "../Components/CustomTextInput";
import i18n from "../Config/i18n";
import CustomScanButton from "../Components/CustomScanButton";
import NfcManager, { NfcEvents, NfcTech } from "react-native-nfc-manager";
import CustomValue from "../Components/CustomValue";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";

const TasksScreen = () => {
  const [scanning, setScanning] = useState(false);
  const [scanCode, setScanCode] = useState("");
  const [hasNfc, setHasNFC] = useState(true);

  NfcManager.start();

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn("Tag found", tag);
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

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
    console.log(data);
  };

  useFocusEffect(() => {});

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <CustomValue style={styles.field} value={scanCode} />

        <CustomScanButton
          text={i18n.t("button.accept")}
          onPress={readNdef}
          scanning={scanning}
        />
      </View>

      {!hasNfc ? <Text>NFC not supported</Text> : null}
    </View>
  );
};

export default TasksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  panel: {
    borderRadius: 12,
    backgroundColor: colors.secondary,
    padding: 15,
    margin: 15,
  },

  field: {
    marginBottom: 15,
  },
});
