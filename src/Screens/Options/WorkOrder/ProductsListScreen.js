import React from "react";
import { colors } from "../../../Styles/Colors";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import i18n from "../../../Config/i18n";
import HorizontalSeparator from "../../../Components/HorizontalSeparator";
import CustomSearchInput from "../../../Components/CustomSearchInput";
import CustomLabel from "../../../Components/CustomLabel";
import ProductItem from "../../../Components/ProductItem";
import CustomButton from "../../../Components/CustomButton";
import CustomFloatingButton from "../../../Components/CustomFloatingButton";
import CustomTitleBar from "../../../Components/CustomTitleBar";

const ProductsListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const option = route.params;
  const { scannedList } = useSelector((state) => state.products.value);

  const [searchText, setSearchText] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    setFilteredProducts(scannedList);
  }, [scannedList]);

  useEffect(() => {
    if (searchText) {
      const filtered = scannedList.filter((c) => c.name.startsWith(searchText));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(scannedList);
    }
  }, [searchText]);

  const renderProduct = (props) => {
    return <ProductItem item={props.item} onPress={() => {}} />;
  };

  return (
    <View style={styles.container}>
      <CustomTitleBar title={option.title} />

      <CustomLabel
        title={i18n.t("title.screen.productsList")}
        text={i18n.t("title.screen.productsList-desc")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />

      <CustomSearchInput placeholder={i18n.t("label.search")} value={searchText} setValue={setSearchText} />
      <View style={{ flex: 1 }}>
        <FlatList data={filteredProducts} renderItem={renderProduct} keyExtractor={(item) => item.id} />
      </View>

      <HorizontalSeparator />
      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.finish")}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          top: windowHeight - 180,
          position: "absolute",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 15,
        }}
      >
        <CustomFloatingButton
          diameter={64}
          onPress={() => {
            navigation.navigate("ScanProduct");
          }}
        />
      </View>
    </View>
  );
};

export default ProductsListScreen;

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

  panel: {
    justifyContent: "flex-end",
    marginHorizontal: 15,
    marginBottom: 15,
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
