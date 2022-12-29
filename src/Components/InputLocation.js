import React from "react";
import i18n from "../Config/i18n";
import CustomText from "./CustomText";
import CustomTextTime from "./CustomTextTime";
import HorizontalSeparator from "./HorizontalSeparator";
import CustomBadge from "./CustomBadge";
import { TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";
import CustomTextInput from "./CustomTextInput";
import { useState } from "react";
import CustomButton from "./CustomButton";

const InputLocation = ({ disabled = false, onPress = undefined, placeholder = "NO-TEXT", value, setValue }) => {

  return (
    <View style={styles.baseView}>
      <View style={styles.centerPart}>
        <TextInput
          editable={!disabled}
          style={{
            height: 48,
            width: "100%",
            color: colors.font,
            paddingHorizontal: 15,
            backgroundColor: colors.background,
            borderRadius: ui.borderRadius,
            borderWidth: 1,
            borderColor: colors.primary,
          }}
          //onBlur={onBlur}
          onChangeText={setValue}
          value={value}
          placeholder={placeholder}
          fontSize={18}
        />
        <HorizontalSeparator height={10} />
        <CustomButton text={i18n.t("button.scanLocation")} onPress={onPress} disabled={disabled}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseView: {
    width: "100%",
    paddingHorizontal: 15,
    paddingBottom: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  centerPart: {
    width: "100%",
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primaryLighter,
    borderRadius: ui.borderRadius,
  },
});
export default InputLocation;
