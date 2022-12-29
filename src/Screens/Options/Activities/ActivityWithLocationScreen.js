import React from "react";
import i18n from "../../../Config/i18n";
import HorizontalSeparator from "../../../Components/HorizontalSeparator";
import CustomButton from "../../../Components/CustomButton";
import CustomTitleBar from "../../../Components/CustomTitleBar";
import InputLocation from "../../../Components/InputLocation";
import Stopwatch from "../../../Components/Stopwatch";
import CustomError from "../../../Components/CustomError";
import ConfirmDialog from "../../../Components/ConfirmDialog";
import { colors } from "../../../Styles/Colors";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ui } from "../../../Config/Constants";
import { useEffect } from "react";
import { setIndoorLocationCode, startActivity, endActivity } from "../../../Features/Shifts";

const ActivityWithLocationScreen = ({ navigation, route }) => {
  const {
    indoorLocationCode,
    error,
    errorMessage,
    selectedShift,
    startedActivity,
    startingActivity,
    finishingActivity,
  } = useSelector((state) => state.shifts.value);
  const { user } = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  const option = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [indoorLocation, setIndoorLocation] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    dispatch(setIndoorLocationCode(null));
  }, []);

  useEffect(() => {
    startedActivity && setTimeout(() => setTimeElapsed(timeElapsed + 1), 1000);
  }, [timeElapsed, startedActivity]);

  useEffect(() => {
    setIndoorLocation(indoorLocationCode);
  }, [indoorLocationCode]);

  const scanIndorLocation = () => {
    navigation.navigate("ScanLocation");
  };

  return (
    <View style={styles.container}>
      <CustomTitleBar title={option.title} />

      {/* <CustomLabel
        title={i18n.t("label.location")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      /> */}

      <View style={{ flex: 1 }}>
        <View style={{ width: "100%" }}>
          <InputLocation
            disabled={startingActivity || startedActivity ? true : false}
            placeholder={i18n.t("label.location")}
            value={indoorLocation}
            setValue={setIndoorLocation}
            onPress={scanIndorLocation}
          />
        </View>

        <View
          style={{
            padding: 5,
            marginHorizontal: 15,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: startedActivity ? colors.primary : colors.inactive,
            borderRadius: ui.borderRadius,
          }}
        >
          <Stopwatch disabled={startedActivity ? false : true} seconds={timeElapsed} />
        </View>

        <HorizontalSeparator />

        <View
          style={{
            marginHorizontal: 15,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <CustomButton
            loading={startingActivity}
            text={i18n.t("button.startActivity")}
            onPress={() => {
              const params = {
                id: user.id,
                shiftId: selectedShift.id,
                activiryId: option.code,
                token: user.token,
              };
              dispatch(startActivity(params));
            }}
            disabled={(indoorLocation && !startedActivity) || startingActivity ? false : true}
          />
        </View>

        <HorizontalSeparator />

        {error ? (
          <View
            style={{
              padding: 5,
              marginHorizontal: 10,
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: colors.error,
              borderRadius: ui.borderRadius,
            }}
          >
            <CustomError title={i18n.t("title.error")} text={errorMessage} />
          </View>
        ) : null}
      </View>

      <HorizontalSeparator />
      <View style={styles.panel}>
        {startedActivity ? (
          <CustomButton
            loading={finishingActivity}
            text={i18n.t("button.finish")}
            onPress={() => {
              setModalVisible(true);
            }}
            disabled={startedActivity ? false : true}
          />
        ) : (
          <CustomButton
            text={i18n.t("button.back")}
            onPress={() => {
              navigation.navigate("OptionsMenu");
            }}
          />
        )}
      </View>

      <ConfirmDialog
        visible={modalVisible}
        title={i18n.t("modal.confirmation")}
        text={i18n.t("modal.confirmation-finishActivity")}
        onAccept={() => {
          const params = {
            id: user.id,
            shiftId: selectedShift.id,
            activiryId: option.code,
            token: user.token,
          };
          dispatch(endActivity(params));
          navigation.navigate("OptionsMenu");
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default ActivityWithLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  panel: {
    marginHorizontal: 15,
    justifyContent: "flex-end",
    marginBottom: ui.tabBar.height + ui.margin,
  },

  loading: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
