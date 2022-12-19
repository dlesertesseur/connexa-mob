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
import { endWorkShift, setActualLocation } from "../Features/Shifts";
import { useState } from "react";
import { getDateFromStr, onTime, zeroPad, onLocation } from "../Util";

const FinalizeWorkShiftScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  const { selectedShift } = useSelector((state) => state.shifts.value);
  const { actualLocation } = useSelector((state) => state.shifts.value);

  const [shiftProcessed, setShiftProcessed] = useState();
  const [activateButton, setActivateButton] = useState(false);

  useEffect(() => {
    if (selectedShift === null) {
      navigation.navigate("WorkShitList");
    }
  }, [selectedShift]);

  useEffect(() => {
    if (selectedShift) {
      const r = { ...selectedShift };

      let startPause = null;
      let endPause = null;
      const start = getDateFromStr(r.startDateAndTime);
      const end = getDateFromStr(r.endDateAndTime);

      if (r.pause) {
        startPause = getDateFromStr(r.pauseStartDateAndTime);
        endPause = getDateFromStr(r.pauseEndDateAndTime);
      }

      r.startMonth = start.getMonth();
      r.startDate = start.getDate();
      r.startDayOfWeek = start.getDay();

      r.startTime = zeroPad(start.getHours(), 2) + ":" + zeroPad(start.getMinutes(), 2);
      r.endTime = zeroPad(end.getHours(), 2) + ":" + zeroPad(end.getMinutes(), 2);

      if (startPause) {
        r.pauseStartTime = zeroPad(startPause.getHours(), 2) + ":" + zeroPad(startPause.getMinutes(), 2);
        r.pauseEndTime = zeroPad(endPause?.getHours(), 2) + ":" + zeroPad(endPause?.getMinutes(), 2);
      }

      if (actualLocation) {
        const ret = onLocation(
          actualLocation?.latitude,
          actualLocation?.longitude,
          r.siteLatitude,
          r.siteLongitude,
          r.siteRadiusInMeters
        );
        r.onLocation = ret;
        setActivateButton(ret);
      } else {
        r.onLocation = false;
        setActivateButton(false);
      }

      r.disabled = true;

      r.onTime = onTime(start, end);
      setShiftProcessed(r);
    }
  }, [selectedShift, actualLocation]);

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
          {shiftProcessed ? <WorkShiftItem item={shiftProcessed} /> : null}
        </View>
      </View>

      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.finalizeWorkShift")}
          onPress={() => {
            const params = { id: selectedShift.id, token: user.token };
            dispatch(endWorkShift(params));
          }}
          disabled={!activateButton}
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 15,
  },
});
