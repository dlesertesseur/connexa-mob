import React from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import WorkShiftItem from "../Components/WorkShiftItem";
import CustomLabel from "../Components/CustomLabel";
import CustomTitleBar from "../Components/CustomTitleBar";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { startWorkShift } from "../Features/Shifts";
import { useEffect } from "react";

const StartWorkShiftScreen = ({ navigation, route }) => {
  const workShift = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  const { selectedShift } = useSelector((state) => state.shifts.value);

  useEffect(() => {
    if (selectedShift) {
      navigation.navigate("OptionsMenu", workShift);
    }
  }, [selectedShift]);

  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.workshiftList")} />
      <CustomLabel title={i18n.t("title.screen.startWorkShift")} text={i18n.t("title.screen.startWorkShift-desc")} />
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
            const params = { id: workShift.id, token: user.token };
            dispatch(startWorkShift(params));
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
