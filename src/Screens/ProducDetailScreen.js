import React, { useEffect, useState } from "react";
import i18n from "../Config/i18n";
import CustomTitleBar from "../Components/CustomTitleBar";
import CustomLabel from "../Components/CustomLabel";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomButton from "../Components/CustomButton";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { ui } from "../Config/Constants";
import { addScannedProduct, findProductByEan } from "../Features/Products";
import { API } from "../Config/Api";
import CustomButtonGroup from "../Components/CustomButtonGroup";

const ProducDetailScreen = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { product } = useSelector((state) => state.products.value);
  const { height, width } = useWindowDimensions();
  const params = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    const parameters = {
      token: user.token,
      id: user.id,
      ean: params.ean,
    };
    dispatch(findProductByEan(parameters));
  }, [params]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CustomTitleBar title={i18n.t("title.screen.productDetail")} marginBottom={0} />

        {product ? (
          <>
            <View style={{ width: "100%", justifyContent: "center", alignItems: "center", marginVertical: ui.margin }}>
              <Image source={{ uri: API.baseImageUrl + product.image }} style={{ width: 300, height: 300 }} />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                alignContent: "center",
              }}
            >
              <CustomLabel title={"Ean"} text={product.ean}></CustomLabel>
              <HorizontalSeparator />
              <CustomLabel title={"Descripcion"} text={product.description}></CustomLabel>
              <HorizontalSeparator />

              <CustomButtonGroup actions={["Bultos", "Pallet"]}/>
              <CustomButtonGroup actions={["#1", "#2", "#3", "#4", "#5"]}/>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator color={colors.primary} size={26} />
          </View>
        )}

        <View
          style={{
            flex: 1,
            marginHorizontal: 15,
            justifyContent: "flex-end",
            alignContent: "center",
            marginBottom: 85,
          }}
        >
          <CustomButton
            disabled={product ? false : true}
            text={i18n.t("button.addProduct")}
            onPress={() => {
              dispatch(addScannedProduct(product));
              navigation.navigate("ProductsList");
            }}
          />
          <HorizontalSeparator />
          <CustomButton
            text={i18n.t("button.cancel")}
            onPress={() => {
              navigation.navigate("ProductsList");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProducDetailScreen;

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
  },

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
