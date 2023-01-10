import React from "react";
import CustomLabel from "./CustomLabel";
import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";
import { Octicons } from "@expo/vector-icons";
import { API } from "../Config/Api";

const ProductItem = ({ item, onPress, onLongPress }) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={{
        width: "100%",
        height: 150,
      }}
      onPress={() => {
        if (onPress) {
          onPress(item);
        }
      }}
      onLongPress={() => {
        if (onLongPress) {
          onLongPress(item);
        }
      }}
    >
      <View style={styles.baseView}>
        <View style={styles.dataView}>
          <View style={styles.leftPart}>
            <Image
              source={{ uri: API.baseImageUrl + item.image }}
              style={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: ui.borderRadius,
                borderBottomLeftRadius: ui.borderRadius,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.rightPart}>
            <View style={styles.detailPart}>
              <View style={styles.topPart}>
                <CustomLabel title={item.ean} text={item.description} titleFont={20} marginHorizontal={0}/>
              </View>

              <View style={styles.bottomPart}>
                <Octicons name="package" size={22} color={colors.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.primary,
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  {item.logisticVariable}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: colors.primary,
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  {item.amount}
                </Text>
              </View>
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
    marginHorizontal: 15,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: ui.borderRadius,
  },

  leftPart: {
    width: 100,
    height: "100%",
    backgroundColor: "#e5e5e5",
    borderTopLeftRadius: ui.borderRadius,
    borderBottomLeftRadius: ui.borderRadius,
    justifyContent: "center",
  },

  rightPart: {
    height: "100%",
    flex: 1,
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

  topPart: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding:5
    // borderColor: "#0000ff",
    // borderWidth: 2,
  },

  bottomPart: {
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding:5
    // borderColor: "#ff0000",
    // borderWidth: 2,
  },

  detailPart: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
});
export default ProductItem;
