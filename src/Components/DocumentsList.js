import React from "react";

import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../Styles/Colors";

const DocumentsList = ({ data = [], onSelect, formatText, numColumns=2, renderItem }) => {

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={numColumns}
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DocumentsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginHorizontal: 15
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
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
