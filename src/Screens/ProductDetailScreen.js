import React, { useEffect, useState } from "react";
import i18n from "../Config/i18n";
import CustomTitleBar from "../Components/CustomTitleBar";
import CustomLabel from "../Components/CustomLabel";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomButton from "../Components/CustomButton";
import CustomButtonGroup from "../Components/CustomButtonGroup";
import ErrorDialog from "../Components/ErrorDialog";
import { StyleSheet, View, useWindowDimensions, ActivityIndicator, Image } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { ui } from "../Config/Constants";
import { addScannedProduct, editProduct, findProductByEan, resetError, resetProduct } from "../Features/Products";
import { API } from "../Config/Api";

const ProductDetailScreen = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { product, error, errorMessage, loading } = useSelector((state) => state.products.value);
  const { height, width } = useWindowDimensions();
  const params = route.params;

  const logisticVariable = Object.values(i18n.t("logisticVariable"));
  const amounts = ["1", "2", "3", "4", "5"];

  const [logisticVariableSelected, setLogisticVariableSelected] = useState(params.logisticVariable ? params.logisticVariable : logisticVariable[0]);
  const [amountSelected, setAmountSelected] = useState(params.amount ? params.amount: amounts[0]);

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

        <ErrorDialog
          visible={error ? true : false}
          title={i18n.t("title.error")}
          text={errorMessage}
          onAccept={() => {
            dispatch(resetError());
          }}
        />

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
              <CustomLabel title={i18n.t("label.ean")} text={product.ean}></CustomLabel>
              <HorizontalSeparator />
              <CustomLabel title={i18n.t("label.description")} text={product.description}></CustomLabel>
              <HorizontalSeparator />

              <CustomButtonGroup
                actions={logisticVariable}
                value={logisticVariableSelected}
                setValue={setLogisticVariableSelected}
              />
              <HorizontalSeparator height={10} />
              <CustomButtonGroup actions={amounts} value={amountSelected} setValue={setAmountSelected} />
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
            {loading ? <ActivityIndicator color={colors.primary} size={26} /> : null}
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
            text={params.edit ? i18n.t("button.editProduct") : i18n.t("button.addProduct")}
            onPress={() => {
              const local = { ...product };
              local["logisticVariable"] = logisticVariableSelected;
              local["amount"] = amountSelected;

              if(params.edit){
                dispatch(editProduct(local));
              }else{
                dispatch(addScannedProduct(local));
              }

              navigation.navigate("ProductsList");
            }}
          />
          <HorizontalSeparator />
          <CustomButton
            text={i18n.t("button.cancel")}
            onPress={() => {
              dispatch(resetProduct());
              navigation.navigate("ProductsList");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

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
