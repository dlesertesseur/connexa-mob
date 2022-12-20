import React from "react";
import i18n from "../Config/i18n";
import CustomText from "./CustomText";
import CustomTextTime from "./CustomTextTime";
import HorizontalSeparator from "./HorizontalSeparator";
import CustomBadge from "./CustomBadge";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";

const WorkShiftItem = ({ item, onPress = undefined, withLocationInfo = true }) => {
  return (
    <TouchableOpacity
      disabled={item?.disabled || onPress === undefined}
      style={{
        width: "100%",
        height: 220,
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
            <CustomText title={i18n.t("month." + item.startMonth)} marginHorizontal={0} fullWidth />
            <CustomText title={item?.startDate} marginHorizontal={0} fontSize={48} />
            <CustomText title={i18n.t("day." + item?.startDayOfWeek)} marginHorizontal={0} />
          </View>
          <View style={styles.rightPart}>
            <HorizontalSeparator height={5} />
            <CustomText title={item.siteName} marginHorizontal={0} fontSize={18} />
            <CustomText text={item.address} marginHorizontal={0} fontSize={14} />

            <HorizontalSeparator height={10} />
            <CustomText title={item.job} marginHorizontal={0} fontSize={18} />
            <HorizontalSeparator />
            <CustomTextTime icon={"clock"} start={item.startTime} end={item.endTime} marginHorizontal={0} />
            {item.pause ? (
              <>
                <HorizontalSeparator height={5} />
                <CustomTextTime
                  icon={"lunch"}
                  start={item.pauseStartTime}
                  end={item.pauseEndTime}
                  marginHorizontal={0}
                />
              </>
            ) : null}

            <HorizontalSeparator height={5} />

            <View style={{ flexDirection: "row" }}>
              {item?.onTime ? (
                <>
                  <CustomBadge
                    text={i18n.t("label.available")}
                    bgColor={colors.active}
                    color={colors.activeDarck}
                    iconName={"timer"}
                  />
                  <View style={{ marginLeft: 5 }}>
                    {withLocationInfo ? (
                      item?.onLocation ? (
                        <CustomBadge
                          text={i18n.t("label.gpsLocation")}
                          bgColor={colors.active}
                          color={colors.activeDarck}
                          iconName={"location-on"}
                        />
                      ) : (
                        <CustomBadge
                          text={i18n.t("label.gpsLocation")}
                          bgColor={colors.inactive}
                          color={colors.inactiveDarck}
                          iconName={"location-off"}
                        />
                      )
                    ) : null}
                  </View>
                </>
              ) : (
                <CustomBadge
                  text={i18n.t("label.available")}
                  bgColor={colors.inactive}
                  color={colors.inactiveDarck}
                  iconName={"timer-off"}
                />
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
    justifyContent: "space-around",
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
