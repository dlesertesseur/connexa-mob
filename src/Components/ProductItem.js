import React from "react";
import HorizontalSeparator from "./HorizontalSeparator";
import i18n from "../Config/i18n";
import { TouchableOpacity, View, StyleSheet, Image, Text } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";


const ProductItem = ({ item, onPress }) => {
  const [quantity, setQuantity] = useState(1);

  const increasePackages = () => {
    setQuantity(quantity + 1);
  };

  const decreasesPackages = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <TouchableOpacity
      disabled={!onPress}
      style={{
        width: "100%",
        height: 120,
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
            <Image
              source={{ uri: item.image }}
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
            <Text
              style={{
                fontSize: 24,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
              }}
            >
              {item.ean}
            </Text>
            <HorizontalSeparator height={10} />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Octicons name="package" size={22} color={colors.primary} />
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.primary,
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  {i18n.t("label.packages")}
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: colors.primary,
                    marginLeft: 5,
                    fontWeight: "bold",
                  }}
                >
                  {quantity}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginLeft: 15 }}
                  onPress={() => {
                    increasePackages();
                  }}
                >
                  <FontAwesome5 name="plus-circle" size={22} color={colors.primary} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginHorizontal: 15 }}
                  onPress={() => {
                    decreasesPackages();
                  }}
                >
                  <FontAwesome5 name="minus-circle" size={22} color={colors.primary} />
                </TouchableOpacity>
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
