import React from "react";
import i18n from "../Config/i18n";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomLabel from "../Components/CustomLabel";
import CustomButton from "../Components/CustomButton";
import { Modal, View } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";

const ConfirmDialog = ({ title, text, onAccept, onCancel, visible }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      //   onRequestClose={() => {
      //     setModalVisible(!modalVisible);
      //   }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 260,
            borderRadius: ui.borderRadius,
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.primary,
            backgroundColor: colors.background,
          }}
        >
          <HorizontalSeparator />
          <CustomLabel title={title} text={text} />
          <HorizontalSeparator />

          <View style={{ width: "100%", paddingHorizontal: 15 }}>
            <CustomButton text={i18n.t("button.accept")} onPress={onAccept} />
            <HorizontalSeparator />
            <CustomButton text={i18n.t("button.cancel")} onPress={onCancel} />
            <HorizontalSeparator />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;
