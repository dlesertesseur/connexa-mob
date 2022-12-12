import React from "react";
import i18n from "../Config/i18n";
import CustomText from "./CustomText";
import CustomTextTime from "./CustomTextTime";
import HorizontalSeparator from "./HorizontalSeparator";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";
import CustomTextRequirement from "./CustomTextRequirement";

const WorkShiftItem = ({ item, onPress }) => {
  const getMonth = (yyyyMMdd) => {
    const mm = yyyyMMdd.substring(4, 6);
    const ret = i18n.t("month." + mm);
    return ret;
  };

  const getDay = (yyyyMMdd) => {
    const dd = yyyyMMdd.substring(6, 8);
    return dd;
  };

  const getWeekDay = (yyyyMMdd) => {
    const y = yyyyMMdd.substring(0, 4);
    const m = yyyyMMdd.substring(4, 6);
    const d = yyyyMMdd.substring(6, 8);

    const date = new Date(y, m - 1, d);

    const ret = i18n.t("day." + date.getDay());
    return ret;
  };

  return (
    <TouchableOpacity
      disabled={!onPress}
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
            <CustomText title={getMonth(item.startDate)} marginHorizontal={0} fullWidth />
            <CustomText title={getDay(item.startDate)} marginHorizontal={0} fontSize={48} />
            <CustomText title={getWeekDay(item.startDate)} marginHorizontal={0} />
          </View>
          <View style={styles.rightPart}>
            {/* <CustomText
              title={item.organization}
              marginHorizontal={0}
              fontSize={24}
              textAlign="center"
              fullWidth={true}
            /> */}
            <HorizontalSeparator height={5} />
            {/* <CustomText text={item.branch + " - " + item.address} marginHorizontal={0} fontSize={16} /> */}
            <CustomText text={item.address} marginHorizontal={0} fontSize={16} />

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
                  //text={item.pauseName}
                  marginHorizontal={0}
                />
              </>
            ) : null}

            {/* {item.requirements ? (
              <>
                <HorizontalSeparator height={5} />
                <CustomTextRequirement
                  text={item.requirements}
                  marginHorizontal={0}
                />
              </>
            ) : null} */}
            <HorizontalSeparator height={5} />
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
