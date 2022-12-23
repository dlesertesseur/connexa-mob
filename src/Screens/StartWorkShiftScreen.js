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
import ConfirmDialog from "../Components/ConfirmDialog";
import { useState } from "react";
import { ui } from "../Config/Constants";

const StartWorkShiftScreen = ({ navigation, route }) => {
  const workShift = route.params;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  const { selectedShift } = useSelector((state) => state.shifts.value);
  const [modalVisible, setModalVisible] = useState(false);

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
          onPress={() => {setModalVisible(true)}}
        />
      </View>

      <ConfirmDialog
        visible={modalVisible}
        title={i18n.t("modal.confirmation")}
        text={i18n.t("modal.confirmation-startShift")}
        onAccept={() => {
            const params = { id: user.id, shiftId: workShift.id, token: user.token };
            dispatch(startWorkShift(params));
            setModalVisible(false);
          }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
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
    marginBottom: ui.tabBar.height + ui.margin,
  },

  centralPanel: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
