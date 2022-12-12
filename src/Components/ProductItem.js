import React from "react";
import CustomText from "./CustomText";
import HorizontalSeparator from "./HorizontalSeparator";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";

const ProductItem = ({ item, onPress }) => {
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
          <View style={styles.leftPart}></View>
          <View style={styles.rightPart}>
            <CustomText
              title={item.name}
              marginHorizontal={0}
              fontSize={24}
              textAlign="center"
              fullWidth={true}
            />
            <HorizontalSeparator height={5} />
            <CustomText
              title={item.ean}
              marginHorizontal={0}
              fontSize={24}
              textAlign="center"
              fullWidth={true}
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
export default ProductItem;
