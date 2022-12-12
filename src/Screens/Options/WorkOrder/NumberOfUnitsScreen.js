import React from "react";
import { colors } from "../../../Styles/Colors";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../../Config/i18n";
import HorizontalSeparator from "../../../Components/HorizontalSeparator";
import CustomLabel from "../../../Components/CustomLabel";
import CustomButton from "../../../Components/CustomButton";
import CustomTitleBar from "../../../Components/CustomTitleBar";

const NumberOfUnitsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const option = route.params;

    return (
    <View style={styles.container}>
      <CustomTitleBar title={option.title} />

      <CustomLabel
        title={i18n.t("title.screen.numberOfUnits")}
        text={i18n.t("title.screen.numberOfUnits-desc")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />

      <HorizontalSeparator />
      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.finish")}
          onPress={() => {
            navigation.navigate("ScanProduct");
          }}
        />
      </View>
    </View>
  );
};

export default NumberOfUnitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  panel: {
    justifyContent: "flex-end",
    marginHorizontal: 15,
    marginBottom: 15,
  },
 
});
