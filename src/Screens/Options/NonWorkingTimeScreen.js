import React, { useEffect, useState } from "react";
import i18n from "../../Config/i18n";
import CustomText from "../../Components/CustomText";
import HorizontalSeparator from "../../Components/HorizontalSeparator";
import CustomButton from "../../Components/CustomButton";
import Speedometer, { Background, Arc, Needle, Progress, Marks, DangerPath } from "react-native-cool-speedometer";
import CustomTitleBar from "../../Components/CustomTitleBar";
import { StyleSheet, View } from "react-native";
import { colors } from "../../Styles/Colors";
import { ui } from "../../Config/Constants";
import { endActivity, resetError, startActivity } from "../../Features/Shifts";
import { useDispatch, useSelector } from "react-redux";
import { calculateDiffInSeconds } from "../../Util";
import ErrorDialog from "../../Components/ErrorDialog";

const NonWorkingTimeScreen = ({ navigation, route }) => {
  const option = route.params;
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalTime, setTotalTime] = useState(30);
  const { selectedShift, startedActivity, error, errorMessage } = useSelector((state) => state.shifts.value);
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const diff = calculateDiffInSeconds(selectedShift.pauseStartDateAndTime, selectedShift.pauseEndDateAndTime) / 60;
    setTotalTime(diff);
  },[selectedShift])

  useEffect(() => {
    let timeout = null;
    if (timeElapsed < totalTime && startedActivity) {
      timeout = setTimeout(() => {
        setTimeElapsed(timeElapsed + 1);
      }, 1000 * 60);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeElapsed, startedActivity]);

  return (
    <View style={styles.container}>
      <CustomTitleBar title={option.title} />
      <CustomText title={i18n.t("title.screen.nonWorkingTime")} fontSize={28} color={colors.primary} />
      <HorizontalSeparator />
      <CustomText text={i18n.t("title.screen.nonWorkingTime-desc")} fontSize={18} color={colors.primary} />
      <HorizontalSeparator height={30} />
      <CustomText title={option.title} fontSize={28} />
      <View style={styles.imgPanel}>
        <Speedometer value={timeElapsed} max={totalTime} rotation={-90} fontFamily="squada-one" width={300}>
          <Background opacity={0.3} />
          <Arc arcWidth={4} />
          <Needle baseOffset={10} circleRadius={20} circleColor={colors.primary} />
          <DangerPath offset={10} angle={42.5} />
          <Progress arcWidth={12} color={colors.primary} />
          <Marks step={2.5} fontSize={20} />
          {/* <Indicator color={colors.primary}/> */}
        </Speedometer>

        {/* <Speedometer
          value={timeElapsed}
          max={totalTime}
          angle={360}
          lineCap="round"
          width={300}
          accentColor={colors.primary}
        >
          <Background color={colors.primaryLighter} />
          <Arc arcWidth={40} color={colors.primary} />
          <Progress arcWidth={40} />
        </Speedometer> */}
      </View>

      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.startWorkShift")}
          onPress={() => {
            const params = {
              id: user.id,
              shiftId: selectedShift.id,
              activiryId: option.code,
              token: user.token,
            };
            dispatch(startActivity(params));
          }}
          disabled={startedActivity}
        />
        <HorizontalSeparator />
        <CustomButton
          text={i18n.t("button.finish")}
          onPress={() => {
            const params = {
              id: user.id,
              shiftId: selectedShift.id,
              activiryId: option.code,
              token: user.token,
            };
            dispatch(endActivity(params));
            navigation.goBack();
          }}
          disabled={!startedActivity}
        />
        <HorizontalSeparator />
        <CustomButton
          text={i18n.t("button.back")}
          onPress={() => {
            navigation.goBack();
          }}
          disabled={startedActivity}
        />
      </View>

      <ErrorDialog visible={error} title={i18n.t("title.error")} text={errorMessage} onAccept={() => {
        dispatch(resetError())
      }}/>
    </View>
  );
};

export default NonWorkingTimeScreen;

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

  imgPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
