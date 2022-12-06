import React, { useEffect, useState } from "react";
import i18n from "../Config/i18n";
import CustomButton from "../Components/CustomButton";
import EanItemList from "../Components/EanItemList";
import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useSelector } from "react-redux";
import { ui } from "../Config/Constants";

const TaskListScreen = ({ navigation }) => {

  const { scannedList } = useSelector((state) => state.products.value);

  const onScan = () => {
    navigation.navigate("scanScreen");
  };

  const renderItem = ({item}) => {
    return (<EanItemList item={item} />);
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <FlatList
          style={styles.list}
          data={scannedList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <CustomButton text={i18n.t("button.scan")} onPress={onScan} />
      </View>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  list: {
    height: "100%",
    marginBottom: 10,
    borderRadius: ui.borderRadius,
    backgroundColor: colors.secondary,
    padding: 10,
  },

  panel: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 90,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
