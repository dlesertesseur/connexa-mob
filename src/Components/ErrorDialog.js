import React from "react";
import i18n from "../Config/i18n";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomLabel from "../Components/CustomLabel";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";

const ErrorDialog = ({ title, text, onAccept, visible }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "75%",
            borderRadius: ui.borderRadius,
            alignItems: "center",
            borderWidth: 1,
            borderColor: colors.error,
            backgroundColor: colors.background,
          }}
        >
          <HorizontalSeparator />
          <View
            style={{
              width:"100%",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <View style={{ marginHorizontal: 15 }}>
              <Text
                style={{
                  fontSize: 24,
                  color: colors.error,
                  fontWeight: "bold",
                }}
              >
                {title}
              </Text>
              <HorizontalSeparator/>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.error,
                }}
              >
                {text}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              padding: ui.margin,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "100%",
                height: 50,
                borderRadius: ui.borderRadius,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 0,
                backgroundColor: colors.error,
              }}
              onPress={onAccept}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: colors.secondary,
                  fontWeight: "bold",
                }}
              >
                {i18n.t("button.accept")}{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorDialog;
