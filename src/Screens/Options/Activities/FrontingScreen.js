import React from "react";
import { colors } from "../../../Styles/Colors";
import { Dimensions, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import i18n from "../../../Config/i18n";
import HorizontalSeparator from "../../../Components/HorizontalSeparator";
import CustomLabel from "../../../Components/CustomLabel";
import CustomButton from "../../../Components/CustomButton";
import CustomTitleBar from "../../../Components/CustomTitleBar";
import { ui } from "../../../Config/Constants";

const FrontingScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const option = route.params;

  // const [modalVisible, setModalVisible] = useState(false);

  const windowHeight = Dimensions.get("window").height;

  return (
    <View style={styles.container}>
      <CustomTitleBar title={option.title} />

      <CustomLabel
        title={i18n.t("title.screen.fronting")}
        text={i18n.t("title.screen.fronting-desc")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />

      <View style={{ flex: 1 }}>
      </View>

      <HorizontalSeparator />
      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.finish")}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          top: windowHeight - 180,
          position: "absolute",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 15,
        }}
      >

      </View>

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <HorizontalSeparator />
            <CustomLabel title={i18n.t("title.screen.deleteItem")} text={i18n.t("title.screen.deleteItem-desc")} />
            <HorizontalSeparator />

            <View style={{width:"100%", paddingHorizontal:15}}>
              <CustomButton
                text={i18n.t("button.delete")}
                onPress={() => {
                  dispatch(deleteScannedProduct(itemSelected));
                  setItemSelected(null);
                  setModalVisible(false);
                }}
              />
              <HorizontalSeparator />
              <CustomButton
                text={"Cancelar"}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <HorizontalSeparator />
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default FrontingScreen;

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

  panel: {
    justifyContent: "flex-end",
    marginHorizontal: 15,
    marginBottom: 15,
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

  modalView: {
    width: 260,
    borderRadius: ui.borderRadius,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
