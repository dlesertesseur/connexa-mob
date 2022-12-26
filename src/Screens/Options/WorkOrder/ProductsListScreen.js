import React from "react";
import { colors } from "../../../Styles/Colors";
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
import { deleteScannedProduct } from "../../../Features/Products";
import { ui } from "../../../Config/Constants";

const ProductsListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const option = route.params;
  const { scannedList } = useSelector((state) => state.products.value);

  const [searchText, setSearchText] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);

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

  const deleteProductItem = (item) => {
    setItemSelected(item);
    setModalVisible(true);
  };

  const renderProduct = (props) => {
    return (
      <ProductItem
        item={props.item}
        onPress={() => {}}
        onLongPress={(item) => {
          deleteProductItem(item);
        }}
      />
    );
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

      <CustomSearchInput
        placeholder={i18n.t("label.search")}
        value={searchText}
        setValue={setSearchText}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
        />
      </View>

      <HorizontalSeparator />
      <View style={styles.panel}>
        <CustomButton
          text={i18n.t("button.finish")}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <HorizontalSeparator />
        <CustomButton
          text={i18n.t("button.back")}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          top: windowHeight - (ui.tabBar.height + ui.margin + 240),
          position: "absolute",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          padding: 15,
        }}
      >
        <CustomFloatingButton
          diameter={64}
          onPress={() => {
            navigation.navigate("ScanProduct", {backScreen:"ProductsList"});
          }}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <HorizontalSeparator />
            <CustomLabel
              title={i18n.t("title.screen.deleteItem")}
              text={i18n.t("title.screen.deleteItem-desc")}
            />
            <HorizontalSeparator />

            <View style={{ width: "100%", paddingHorizontal: 15 }}>
              <CustomButton
                text={i18n.t("button.delete")}
                onPress={() => {
                  dispatch(deleteScannedProduct(itemSelected));
                  setItemSelected(null);
                  setModalVisible(false);
                }}
              />
              <HorizontalSeparator />
              <CustomButton
                text={"Cancelar"}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <HorizontalSeparator />
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: ui.tabBar.height + ui.margin,
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

  modalView: {
    width: 260,
    borderRadius: ui.borderRadius,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
