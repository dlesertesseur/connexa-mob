import i18n from "../Config/i18n";
import CustomImage from "../Components/CustomImage";
import React from "react";
import CustomText from "../Components/CustomText";
import CustomActionList from "../Components/CustomActionList";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomSearchInput from "../Components/CustomSearchInput";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCountry } from "../Features/Auth";
import { useEffect } from "react";

const SelectCountryScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [countries, setCountries] = useState(
    require("../DataAccess/countries-cities.json")
  );
  const [searchText, setSearchText] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const logo = require("../../assets/images/logo-banner.png");

  const formatText = (item) => {
    return "(" + item.numeric_code + ") " + item.name;
  };

  useEffect(() => {
    if (searchText) {
      const filtered = countries.filter((c) => c.name.startsWith(searchText));
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />

      <CustomText
        title={i18n.t("title.screen.selectCountry")}
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
        data={filteredCountries}
        onSelect={(country) => {
          dispatch(setSelectedCountry(country.name));
          navigation.navigate("SelectCity", country);
        }}
        formatText={formatText}
      />
      <HorizontalSeparator />
    </View>
  );
};

export default SelectCountryScreen;

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
