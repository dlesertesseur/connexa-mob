import i18n from "../Config/i18n";
import React from "react";
import CustomText from "../Components/CustomText";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomSearchInput from "../Components/CustomSearchInput";
import WorkShiftItem from "../Components/WorkShiftItem";
import CustomTitleBar from "../Components/CustomTitleBar";
import { BackHandler, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { ui } from "../Config/Constants";
import { MaterialIcons } from "@expo/vector-icons";
import { getDateFromStr, onTime, zeroPad } from "../Util";

const OptionsMenuScreen = ({ navigation, route }) => {
  const { selectedShift } = useSelector((state) => state.shifts.value);

  const [options, setOptions] = useState(require("../DataAccess/optionsMenu.json"));
  const [searchText, setSearchText] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [shiftProcessed, setShiftProcessed] = useState();

  const onSelect = (item) => {
    navigation.navigate(item.type, item);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    if (selectedShift) {
      const r = { ...selectedShift };

      let startPause = null;
      let endPause = null;
      const start = getDateFromStr(r.startDateAndTime);
      const end = getDateFromStr(r.endDateAndTime);

      if (r.pause) {
        startPause = getDateFromStr(r.pauseStartDateAndTime);
        endPause = getDateFromStr(r.pauseEndDateAndTime);
      }

      r.startMonth = start.getMonth();
      r.startDate = start.getDate();
      r.startDayOfWeek = start.getDay();

      r.startTime = zeroPad(start.getHours(), 2) + ":" + zeroPad(start.getMinutes(), 2);
      r.endTime = zeroPad(end.getHours(), 2) + ":" + zeroPad(end.getMinutes(), 2);

      if (startPause) {
        r.pauseStartTime = zeroPad(startPause.getHours(), 2) + ":" + zeroPad(startPause.getMinutes(), 2);
        r.pauseEndTime = zeroPad(endPause?.getHours(), 2) + ":" + zeroPad(endPause?.getMinutes(), 2);
      }

      r.onTime = onTime(start, end);
      setShiftProcessed(r);
    }
  }, [selectedShift]);

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
        <MaterialIcons name="navigate-next" size={24} color={colors.secondary} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.activityLog")} />

      <View style={styles.centralPanel}>
        <View style={{ width: "100%" }}>
          {shiftProcessed ? <WorkShiftItem item={shiftProcessed} withLocationInfo={false} /> : null}
        </View>
      </View>

      <HorizontalSeparator />

      <CustomText
        title={i18n.t("title.screen.optionsMenu")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />

      <CustomSearchInput placeholder={i18n.t("label.search")} value={searchText} setValue={setSearchText} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          marginHorizontal: 15,
          marginBottom: 15,
        }}
      >
        <FlatList data={filteredOptions} renderItem={renderOption} keyExtractor={(item) => item.id} />
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
