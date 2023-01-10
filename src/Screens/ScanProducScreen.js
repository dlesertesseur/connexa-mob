import React, { useEffect, useState } from "react";
import i18n from "../Config/i18n";
import CustomError from "../Components/CustomError";
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from "react-native";
import { colors } from "../Styles/Colors";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { addScannedProduct, findProductByEan } from "../Features/Products";
import { useDispatch } from "react-redux";
import { ui } from "../Config/Constants";
import { findProuctByEan } from "../DataAccess/ProductDao";
import { FontAwesome } from "@expo/vector-icons";
import CustomTitleBar from "../Components/CustomTitleBar";
import UserAvatar from "react-native-user-avatar-component";

const ScanProducScreen = ({ navigation, route, barCode = true, qrCode = false }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanActived, setScanActived] = useState(false);
  const [error, setError] = useState(null);
  const [sound, setSound] = useState();

  const params = route.params;
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  async function playSound(data) {
    const { sound } = await Audio.Sound.createAsync(require("./../../assets/sound/beep_2.mp3"));
    setSound(sound);
    sound.playAsync().then(() => {
      const params = {ean: data.ean};
      navigation.navigate("ProductDetail", params);
    });
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    playSound({ type: type, ean: data });
  };

  const actionButton = () => {
    return (
      <TouchableOpacity
        style={[styles.scanButton, scanActived ? styles.scanButtonActived : styles.scanButtoninactived]}
        onPressIn={activeScan}
        onPressOut={deactiveScan}
      >
        {barCode ? <MaterialCommunityIcons name="barcode-scan" size={48} color="white" /> : null}

        {qrCode ? <MaterialCommunityIcons name="qrcode-scan" size={48} color="white" /> : null}
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
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "#ff0000" }]}>
        {!error ? (
          <BarCodeScanner
            onBarCodeScanned={!scanned && scanActived ? handleBarCodeScanned : undefined}
            style={StyleSheet.absoluteFillObject}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean]}
          />
        ) : (
          <CustomError title={i18n.t("title.error")} text={error} />
        )}
      </View>
      <View>
        <CustomTitleBar title={i18n.t("title.screen.scanProduct")} marginBottom={0} />
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            top: height - ui.tabBar.height,
            position: "absolute",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 15,
          }}
        >
          {actionButton()}
        </View>

        <View
          style={{
            top: 60,
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
    </View>
  );
};

export default ScanProducScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  panel: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#ff0000",
    borderWidth: 2,
  },

  // control: {
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: "transparent",
  //   position: "absolute",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   padding: 15,
  // },

  text: {
    color: "#ffffff",
    alignItems: "center",
    justifyContent: "center",

    fontSize: 36,
  },

  scanButton: {
    width: "100%",
    height: ui.controlButtonHeight,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: ui.borderRadius,
    margin: ui.tabBar.height,
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

  cameraContainer: {
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: "100%",
    padding: 0,
  },
});
