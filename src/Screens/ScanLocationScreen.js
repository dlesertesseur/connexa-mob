import React, { useEffect, useState } from "react";
import i18n from "../Config/i18n";
import CustomError from "../Components/CustomError";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { colors } from "../Styles/Colors";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useDispatch } from "react-redux";
import { ui } from "../Config/Constants";
import { setIndoorLocationCode } from "../Features/Shifts";
import { FontAwesome } from "@expo/vector-icons";

const ScanLocationScreen = ({ navigation, route }) => {
  const params = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanActived, setScanActived] = useState(false);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState();
  const dispatch = useDispatch();

  async function playSound(data) {
    const { sound } = await Audio.Sound.createAsync(require("./../../assets/sound/beep_2.mp3"));
    setSound(sound);
    sound.playAsync().then(() => {
      dispatch(setIndoorLocationCode(data));
      navigation.goBack();
    });
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleCodeScanned = ({ type, data }) => {
    setScanned(true);
    playSound(data);
  };

  const actionButton = () => {
    return (
      <TouchableOpacity
        style={[styles.scanButton, scanActived ? styles.scanButtonActived : styles.scanButtoninactived]}
        onPressIn={activeScan}
        onPressOut={deactiveScan}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={48} color="white" />
      </TouchableOpacity>
    );
  };

  const activeScan = () => {
    setScanActived(true);
  };

  const deactiveScan = () => {
    setScanActived(false);
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        {!error ? (
          <BarCodeScanner
            onBarCodeScanned={!scanned && scanActived ? handleCodeScanned : undefined}
            style={StyleSheet.absoluteFill}
            //barCodeTypes={[BarCodeScanner.Constants.BarCodeType.e]}
          />
        ) : (
          <CustomError title={i18n.t("title.error")} text={error} />
        )}
      </View>
      <View style={styles.control}>{actionButton()}</View>

      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "absolute",
          padding: ui.margin,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(params.backScreen);
          }}
        >
          <FontAwesome name="close" size={48} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  panel: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },

  control: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 15,
  },

  text: {
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",

    fontSize: 36,
  },

  scanButton: {
    width: "100%",
    height: 90,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: ui.borderRadius,
    margin: 15,
    marginBottom: ui.tabBar.height,
  },

  scanButtonActived: {
    backgroundColor: "#FF0000",
  },

  scanButtoninactived: {
    backgroundColor: "#00FF00",
  },

  quantityBt: {
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: ui.borderRadius,
    margin: 15,
    padding: 15,
    backgroundColor: colors.primary,
  },
});
