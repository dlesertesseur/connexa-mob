import React, { useEffect, useState } from "react";
import i18n from "../Config/i18n";
import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import AlertOptionItem from "../Components/OptionItem";

const OptionsMenuScreen = ({ navigation }) => {
  const optionsList = () => {
    const ret = [];
    ret.push({ screenName: "alertScreen", label: "Alert", iconName: "bell" });

    return ret;
  };

  const onPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const renderItem = ({ item }) => {
    return <AlertOptionItem screenName={item.screenName} label={item.label} iconName={item.iconName}  onPress={onPress} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <FlatList
          numColumns={2}
          style={styles.list}
          data={optionsList()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default OptionsMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  list: {
    height: "100%",
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    //padding: 10,
  },

  panel: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 80,
    borderRadius: 4,
  },

  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});
