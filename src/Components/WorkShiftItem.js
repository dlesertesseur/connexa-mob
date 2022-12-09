import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";
import CustomText from "./CustomText";
import CustomTextTime from "./CustomTextTime";
import HorizontalSeparator from "./HorizontalSeparator";

const WorkShiftItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height:180
      }}
      onPress={() => {onPress(item)}}
    >
      <View style={styles.baseView}>
        <View style={styles.dataView}>
          <View style={styles.leftPart}>
            <CustomText title={item.month} marginHorizontal={0} fullWidth />
            <CustomText title={item.date} marginHorizontal={0} fontSize={48} />
            <CustomText title={item.weekDay} marginHorizontal={0} />
          </View>
          <View style={styles.rightPart}>
            <CustomText
              title={item.organization}
              marginHorizontal={0}
              fontSize={24}
              textAlign="center"
              fullWidth={true}
            />
            <HorizontalSeparator height={5} />
            <CustomText
              text={item.branch + " - " + item.address}
              marginHorizontal={0}
              fontSize={16}
            />
            <HorizontalSeparator height={10} />
            <CustomText
              title={item.workType}
              marginHorizontal={0}
              fontSize={18}
            />
            <HorizontalSeparator />
            <CustomTextTime
              icon={"clock"}
              start={item.entryTime}
              end={item.exitTime}
              marginHorizontal={0}
            />
            <HorizontalSeparator height={5} />
            <CustomTextTime
              icon={"lunch"}
              start={item.lunchStartTime}
              end={item.lunchEndTime}
              marginHorizontal={0}
            />

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
