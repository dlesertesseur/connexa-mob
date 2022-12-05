import i18n from "../Config/i18n";
import CustomImage from "../Components/CustomImage";
import React from "react";
import CustomText from "../Components/CustomText";
import CustomActionList from "../Components/CustomActionList";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomSearchInput from "../Components/CustomSearchInput";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch } from "react-redux";
import { setSeletedCity } from "../Features/Auth";
import { useEffect } from "react";
import { useState } from "react";

const SelectCityScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const logo = require("../../assets/images/logo-banner.png");
  const [cities, setCities] = useState(route.params.cities);
  const [searchText, setSearchText] = useState(null);
  const [filteredCities, setFilteredCities] = useState(cities);
  
  useEffect(() => {
    if (searchText) {
      const filtered = cities.filter(c => c.name.startsWith(searchText));
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />

      <CustomText
        title={i18n.t("title.screen.selectCity")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />
      <CustomSearchInput
        placeholder={i18n.t("label.search")}
        value={searchText}
        setValue={setSearchText}
      />

      <CustomActionList
        data={filteredCities}
        onSelect={(city) => {
          dispatch(setSeletedCity(city));
          navigation.navigate("PersonalData");
        }}
      />
      <HorizontalSeparator />
    </View>
  );
};

export default SelectCityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  panel: {
    marginHorizontal: 15,
  },

  btPanel: {
    marginHorizontal: 15,
    marginBottom: 15,
    justifyContent: "flex-end",
  },

  logo: {
    marginTop: 30,
    //marginBottom: 30,
  },

  loading: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
