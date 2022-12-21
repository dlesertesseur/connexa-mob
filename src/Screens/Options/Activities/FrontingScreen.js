import React from "react";
import { colors } from "../../../Styles/Colors";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import i18n from "../../../Config/i18n";
import HorizontalSeparator from "../../../Components/HorizontalSeparator";
import CustomLabel from "../../../Components/CustomLabel";
import CustomButton from "../../../Components/CustomButton";
import CustomTitleBar from "../../../Components/CustomTitleBar";
import InputLocation from "../../../Components/InputLocation";
import Stopwatch from "../../../Components/Stopwatch";
import { ui } from "../../../Config/Constants";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { endActiviryFronting, startActiviryFronting } from "../../../Features/Shifts";
import CustomError from "../../../Components/CustomError";

const FrontingScreen = ({ navigation, route }) => {
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

  const windowHeight = Dimensions.get("window").height;

  // const [modalVisible, setModalVisible] = useState(false);
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [indoorLocation, setIndoorLocation] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       setStopwatchStart(false);
  //       setIndoorLocation(null);
  //       console.log("useFocusEffect -> lost");
  //     };
  //   }, [indoorLocation])
  // );

  useEffect(() => {
    stopwatchStart > 0 && setTimeout(() => setTimeElapsed(timeElapsed + 1), 1000);
  }, [timeElapsed]);

  useEffect(() => {
    setIndoorLocation(indoorLocationCode);
  }, [indoorLocationCode]);

  const scanIndorLocation = () => {
    navigation.navigate("ScanLocation");
  };

  return (
    <View style={styles.container}>
      <CustomTitleBar title={option.title} />

      <CustomLabel
        title={i18n.t("title.screen.fronting")}
        text={i18n.t("title.screen.fronting-desc")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />

      <View style={{ flex: 1 }}>
        <View style={{ width: "100%" }}>
          <InputLocation
            disabled={startedActivity ? true : false}
            placeholder={i18n.t("label.location")}
            value={indoorLocation}
            setValue={setIndoorLocation}
            onPress={scanIndorLocation}
          />
        </View>

        <View
          style={{
            padding: 5,
            marginHorizontal: 10,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: stopwatchStart ? colors.primary : colors.inactive,
            borderRadius: ui.borderRadius,
          }}
        >
          <Stopwatch disabled={stopwatchStart ? false : true} seconds={timeElapsed}/>
        </View>

        <HorizontalSeparator />

        <View
          style={{
            marginHorizontal: 10,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <CustomButton
            loading={startingActivity}
            text={i18n.t("button.startActivity")}
            onPress={() => {
              const params = {
                id: selectedShift.id,
                token: user.token,
              };
              dispatch(startActiviryFronting(params));
              setStopwatchStart(true);
            }}
            disabled={indoorLocation && startedActivity === null ? false : true}
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
        <CustomButton
          loading={finishingActivity}
          text={i18n.t("button.finish")}
          onPress={() => {
            const params = {
              id: selectedShift.id,
              token: user.token,
            };
            dispatch(endActiviryFronting(params));
            navigation.goBack();
          }}
          disabled={startedActivity ? false : true}
        />
      </View>
      {/* <View
        style={{
          width: "100%",
          top: windowHeight - 180,
          position: "absolute",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 15,
        }}
      ></View> */}

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <HorizontalSeparator />
            <CustomLabel title={i18n.t("title.screen.deleteItem")} text={i18n.t("title.screen.deleteItem-desc")} />
            <HorizontalSeparator />

            <View style={{width:"100%", paddingHorizontal:15}}>
              <CustomButton
                text={i18n.t("button.delete")}
                onPress={() => {
                  dispatch(deleteScannedProduct(itemSelected));
                  setItemSelected(null);
                  setModalVisible(false);
                }}
              />
              <HorizontalSeparator />
              <CustomButton
                text={"Cancelar"}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <HorizontalSeparator />
            </View>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default FrontingScreen;

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
    marginHorizontal: 15,
    marginBottom: 15,
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

  modalView: {
    width: 260,
    borderRadius: ui.borderRadius,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
