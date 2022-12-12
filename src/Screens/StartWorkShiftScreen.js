import React from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import WorkShiftItem from "../Components/WorkShiftItem";
import CustomLabel from "../Components/CustomLabel";
import CustomTitleBar from "../Components/CustomTitleBar";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch } from "react-redux";
import { setSelectedShift } from "../Features/Shifts";

const StartWorkShiftScreen = ({ navigation, route }) => {
  const workShift = route.params;
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.workshiftList")} />
      <CustomLabel title={i18n.t("title.screen.startWorkShift")} text={i18n.t("title.screen.startWorkShift-desc")}/>
      <HorizontalSeparator />
      <View style={styles.centralPanel}>
        <View style={{ height: 300, width: "100%" }}>
          <WorkShiftItem item={workShift} />
        </View>
      </View>

      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.startWorkShift")}
          onPress={() => {
            dispatch(setSelectedShift(workShift));
            navigation.navigate("OptionsMenu");
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
    marginBottom: 15,
  },

  centralPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
