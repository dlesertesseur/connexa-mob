import React, { useEffect } from "react";
import i18n from "../Config/i18n";
import CustomText from "./CustomText";
import CustomTextTime from "./CustomTextTime";
import HorizontalSeparator from "./HorizontalSeparator";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";
import { getDateFromStr, zeroPad } from "../Util";
import CustomBadge from "./CustomBadge";

const WorkShiftItem = ({ item, onPress }) => {
  const start = getDateFromStr(item.startDateAndTime);
  const end = getDateFromStr(item.endDateAndTime);

  let startPause = null;
  let endPause = null;

  if (item.pause) {
    startPause = getDateFromStr(item.pauseStartDateAndTime);
    endPause = getDateFromStr(item.pauseEndDateAndTime);
  }

  const onTime = () => {
    let ret = false;
    const localTime = new Date();
    if (localTime >= start && localTime <= end) {
      ret = true;
    }

    return ret;
  };

  const onLocation = () => {
    return false;
  };

  return (
    <TouchableOpacity
      disabled={!onTime()}
      style={{
        width: "100%",
        height: 180,
      }}
      onPress={() => {
        if (onPress) {
          onPress(item);
        }
      }}
    >
      <View style={styles.baseView}>
        <View style={styles.dataView}>
          <View style={styles.leftPart}>
            <CustomText title={i18n.t("month." + start.getMonth())} marginHorizontal={0} fullWidth />
            <CustomText title={start.getDate()} marginHorizontal={0} fontSize={48} />
            <CustomText title={i18n.t("day." + start.getDay())} marginHorizontal={0} />
          </View>
          <View style={styles.rightPart}>
            <HorizontalSeparator height={5} />
            <CustomText text={item.address} marginHorizontal={0} fontSize={16} />

            <HorizontalSeparator height={10} />
            <CustomText title={item.job} marginHorizontal={0} fontSize={18} />
            <HorizontalSeparator />
            <CustomTextTime
              icon={"clock"}
              start={zeroPad(start.getHours(), 2) + ":" + zeroPad(start.getMinutes(), 2)}
              end={zeroPad(end.getHours(), 2) + ":" + zeroPad(end.getMinutes(), 2)}
              marginHorizontal={0}
            />
            {item.pause ? (
              <>
                <HorizontalSeparator height={5} />
                <CustomTextTime
                  icon={"lunch"}
                  start={zeroPad(startPause?.getHours(), 2) + ":" + zeroPad(startPause?.getMinutes(), 2)}
                  end={zeroPad(endPause?.getHours(), 2) + ":" + zeroPad(endPause?.getMinutes(), 2)}
                  marginHorizontal={0}
                />
              </>
            ) : null}

            <HorizontalSeparator height={5} />

            <View style={{ flexDirection: "row" }}>
              {onTime() ? (
                <>
                <CustomBadge text={i18n.t("label.available")} bgColor={colors.active} color={colors.activeDarck} iconName={"timer"}/>
                <View style={{ marginLeft:5}}>
                {onLocation() ? (
                  <CustomBadge text={i18n.t("label.gpsLocation")} bgColor={colors.active} color={colors.activeDarck} iconName={"location-on"}/>
                ) : (
                  <CustomBadge text={i18n.t("label.gpsLocation")} bgColor={colors.inactive} color={colors.inactiveDarck} iconName={"location-off"}/>
                )}
              </View>

                </>
              ) : (
                <CustomBadge text={i18n.t("label.available")} bgColor={colors.inactive} color={colors.inactiveDarck} iconName={"timer-off"}/>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseView: {
    marginBottom: 10,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  leftPart: {
    width: 100,
    height: "100%",
    backgroundColor: "#e5e5e5",
    padding: 5,
    borderTopLeftRadius: ui.borderRadius,
    borderBottomLeftRadius: ui.borderRadius,
    justifyContent: "center",
  },

  rightPart: {
    height: "100%",
    flex: 1,
    padding: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: colors.primaryLighter,
    borderTopRightRadius: ui.borderRadius,
    borderBottomRightRadius: ui.borderRadius,
  },
  dataView: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
});
export default WorkShiftItem;
