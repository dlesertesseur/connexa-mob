import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../Styles/Colors";
import { ui } from "../Config/Constants";

const CustomActionList = ({ data = [], onSelect, formatText }) => {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.row} onPress={() => onSelect(item)}>
        <Text style={styles.text}>
          {formatText ? formatText(item) : item.name}
        </Text>

        <MaterialIcons name="navigate-next" size={24} color={colors.primary} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CustomActionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // borderWidth:1,
    // borderColor: colors.primary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: ui.borderRadius,
    marginBottom: 10,
    marginHorizontal: 15,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLighter
  },

  text: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryDarker,
  },

  image: {
    width: 24,
    height: 24,
  },
});
