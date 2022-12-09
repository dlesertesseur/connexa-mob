import i18n from "../Config/i18n";
import CustomImage from "../Components/CustomImage";
import React from "react";
import CustomText from "../Components/CustomText";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomSearchInput from "../Components/CustomSearchInput";
import WorkShiftItem from "../Components/WorkShiftItem";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { ui } from "../Config/Constants";
import { MaterialIcons } from "@expo/vector-icons";

const OptionsMenuScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const workShift = route.params;
  const [options, setOptions] = useState(
    require("../DataAccess/optionsMenu.json")
  );
  const [searchText, setSearchText] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const onSelect = (item) => {
    console.log("onSelect", item);
  };

  useEffect(() => {
    if (searchText) {
      const filtered = options.filter((c) => c.option.startsWith(searchText));
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchText]);

  const renderOption = ({ item }) => {
    return (
      <TouchableOpacity style={styles.row} onPress={() => onSelect(item)}>
        <Text style={styles.text}>{item.option}</Text>
        <MaterialIcons
          name="navigate-next"
          size={24}
          color={colors.secondary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomText
        title={i18n.t("title.screen.activityLog")}
        fontSize={28}
        color={colors.primary}
      />
      <HorizontalSeparator />

      <View style={styles.centralPanel}>
        <View style={{ width: "100%" }}>
          <WorkShiftItem item={workShift} />
        </View>
      </View>

      <HorizontalSeparator />

      <CustomText
        title={i18n.t("title.screen.optionsMenu")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />

      <CustomSearchInput
        placeholder={i18n.t("label.search")}
        value={searchText}
        setValue={setSearchText}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          marginHorizontal: 15,
          marginBottom: 80,
        }}
      >
        <FlatList
          data={filteredOptions}
          renderItem={renderOption}
          keyExtractor={(item) => item.id}
        />
      </View>

      <HorizontalSeparator />
    </View>
  );
};

export default OptionsMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  centralPanel: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 46,
    borderWidth: 1,
    padding: 5,
    borderRadius: ui.borderRadius,
    marginBottom: 10,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  text: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.secondary,
  },
});
