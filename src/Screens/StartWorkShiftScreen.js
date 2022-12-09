import React, { useEffect, useRef } from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomText from "../Components/CustomText";
import WorkShiftItem from "../Components/WorkShiftItem";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";

const StartWorkShiftScreen = ({ navigation, route }) => {
  const workShift = route.params;

  return (
    <View style={styles.container}>
      <CustomText
        title={i18n.t("title.screen.startWorkShift")}
        fontSize={28}
        color={colors.primary}
      />
      <HorizontalSeparator />
      <CustomText
        text={i18n.t("title.screen.startWorkShift-desc")}
        fontSize={18}
        color={colors.primary}
      />
      <View style={styles.centralPanel}>
        <View style={{height:300, width:"100%"}}>
          <WorkShiftItem item={workShift} />
        </View>
      </View>

      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.startWorkShift")}
          onPress={() => {
            navigation.navigate("OptionsMenu", workShift);
          }}
        />
      </View>
    </View>
  );
};

export default StartWorkShiftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  logo: {
    marginTop: 30,
  },

  picture: {
    resizeMode: "center",
  },

  panel: {
    margin: 15,
    justifyContent: "flex-end",
    marginBottom: 85,
  },

  centralPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:15
  },
});
