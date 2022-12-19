import i18n from "../Config/i18n";
import React from "react";
import WorkShiftItem from "../Components/WorkShiftItem";
import CustomTitleBar from "../Components/CustomTitleBar";
import CustomText from "../Components/CustomText";
import haversine from "haversine-distance";
import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ui } from "../Config/Constants";
import { findAllShiftsByWorkerId } from "../Features/Shifts";
import { useState } from "react";
import { getDateFromStr } from "../Util";

function onTime(start, end) {
  let ret = false;
  const localTime = new Date();
  if (localTime >= start && localTime <= end) {
    ret = true;
  }

  return ret;
}

function onLocation(lat1, long1, lat2, long2) {
  const a = { lat1, long1 };
  const b = { lat2, long2 };
  const ret = haversine(a, b);
  console.log(ret);
  return(ret);
}

const WorkShitListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  const { shifts, selectedShift } = useSelector((state) => state.shifts.value);
  const { actualLocation } = useSelector((state) => state.shifts.value);
  const [shiftProcess, setShiftProcess] = useState([]);

  useEffect(() => {
    const ret = shifts.map((s) => {
      const r = { ...s };
      let startPause = null;
      let endPause = null;
      const start = getDateFromStr(r.startDateAndTime);
      const end = getDateFromStr(r.endDateAndTime);

      if (r.pause) {
        startPause = getDateFromStr(r.pauseStartDateAndTime);
        endPause = getDateFromStr(r.pauseEndDateAndTime);
      }

      r.start = start;
      r.end = end;
      r.onTime = onTime(start, end);
      r.startPause = startPause;
      r.endPause = endPause;

      r.onLocation = onLocation(
        actualLocation.latitude,
        actualLocation.longitude,
        r.latitude,
        r.longitude
      );
      return r;
    });
    setShiftProcess(ret);
  }, [shifts, actualLocation]);

  useEffect(() => {
    const params = { id: user.id, token: user.token };
    dispatch(findAllShiftsByWorkerId(params));
  }, [selectedShift]);

  const onPressShitf = (item) => {
    navigation.navigate("StartWorkShift", item);
  };

  const renderShit = (props) => {
    return <WorkShiftItem item={props.item} onPress={onPressShitf} />;
  };

  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.workshiftList")} />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          marginHorizontal: 15,
          marginBottom: 15,
        }}
      >
        <FlatList
          data={shiftProcess}
          renderItem={renderShit}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() =>
            !shiftProcess.length ? (
              <CustomText
                title={i18n.t("title.noData")}
                text={i18n.t("message.data.shift")}
                fontSize={20}
              />
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default WorkShitListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  logo: {
    marginTop: 30,
  },

  status: {
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: colors.primary,
    color: colors.secondary,
    fontSize: 14,
    margin: 5,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    marginHorizontal: 5,
    color: colors.primary,
    fontWeight: "bold",
  },

  textSub: {
    fontSize: 14,
    marginHorizontal: 5,
    color: colors.primary,
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
    backgroundColor: colors.pending,
  },
  panel: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  btPanel: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
});
