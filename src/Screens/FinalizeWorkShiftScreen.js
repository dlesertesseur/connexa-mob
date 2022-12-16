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
import { useEffect } from "react";
import { workShiftStatus } from "../Config/Constants";
import { endWorkShift } from "../Features/Shifts";

const FinalizeWorkShiftScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  const { selectedShift } = useSelector((state) => state.shifts.value);

  useEffect(() => {
    if (selectedShift === null) {
      navigation.navigate("WorkShitList");
    }
  }, [selectedShift]);

  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.workshiftList")} />
      <CustomLabel
        title={i18n.t("title.screen.finalizeWorkShift")}
        text={i18n.t("title.screen.finalizeWorkShift-desc")}
      />
      <HorizontalSeparator />
      <View style={styles.centralPanel}>
        <View style={{ height: 300, width: "100%" }}>
          {selectedShift ? <WorkShiftItem item={selectedShift} /> : null}
        </View>
      </View>

      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.finalizeWorkShift")}
          onPress={() => {
            const params = { id: selectedShift.id, token: user.token };
            dispatch(endWorkShift(params));
          }}
        />
      </View>
    </View>
  );
};

export default FinalizeWorkShiftScreen;

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
