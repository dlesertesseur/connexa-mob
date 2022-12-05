import i18n from "../Config/i18n";
import CustomImage from "../Components/CustomImage";
import React from "react";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomSearchInput from "../Components/CustomSearchInput";
import CustomLabel from "../Components/CustomLabel";
import DocumentsList from "../Components/DocumentsList";
import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { documentStatus, ui } from "../Config/Constants";

const DocumentsListScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [documents, setDocuments] = useState(
    require("../DataAccess/documents.json")
  );

  const [searchText, setSearchText] = useState(null);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  const logo = require("../../assets/images/logo-banner.png");
  const noDocument = require("../../assets/images/noPhoto.png");

  useEffect(() => {
    if (searchText) {
      const filtered = documents.filter((c) => c.name.startsWith(searchText));
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchText]);

  const getColor = (status) => {
    let color = null;

    switch (status) {
      case documentStatus.ACTIVE:
        color = colors.primary;
        break;
      case documentStatus.EXPIRED:
        color = colors.error;
        break;
      case documentStatus.PENDING:
        color = colors.pending;
        break;

      default:
        color = colors.pending;
        break;
    }

    return color;
  };

  const determinareIcon = (status) => {
    let ret = (
      <Text
        style={[
          styles.status,
          {
            backgroundColor: getColor(status),
          },
        ]}
      >
        {i18n.t("documents.status." + status)}
      </Text>
    );
    return ret;
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          width: "50%",
          height: 260,
        }}
        onPress={(item) => {
          navigation.navigate("ShowImage");
        }}
      >
        <View
          style={{
            marginRight: index % 2 === 0 ? 5 : 0,
            marginLeft: index % 2 > 0 ? 5 : 0,
            marginBottom: 10,
            flex: 1,
            padding: 1,
            borderRadius: ui.borderRadius,
            borderWidth: ui.borderWidth,
            borderColor: colors.primary,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: colors.primaryLighter,
          }}
        >
          <Image
            source={noDocument}
            resizeMode={"cover"}
            style={styles.image}
          />
          <View style={styles.dataView}>
            <View style={styles.panel}>
              <View
                style={{
                  margin: 5,
                }}
              >
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 10,
                  alignItems: "center",
                }}
              >
                {item.validity > 0 ? (
                  <>
                    <FontAwesome
                      name="calendar"
                      size={18}
                      color={colors.primary}
                    />
                    <Text style={styles.textSub}>
                      {item.validity + " " + i18n.t("label.months")}
                    </Text>
                  </>
                ) : null}
              </View>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              {determinareIcon(item.status)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />

      <CustomLabel
        title={i18n.t("title.screen.documents")}
        text={i18n.t("title.screen.documents-desc")}
        fontSize={24}
        color={colors.primary}
        textAlign="flex-start"
      />

      <CustomSearchInput
        placeholder={i18n.t("label.search")}
        value={searchText}
        setValue={setSearchText}
      />

      <DocumentsList
        data={filteredDocuments}
        renderItem={renderItem}
      />
      <HorizontalSeparator />
    </View>
  );
};

export default DocumentsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  logo: {
    marginTop: 30,
  },

  status: {
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: colors.primary,
    color: colors.secondary,
    fontSize: 14,
    margin: 5,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
    marginHorizontal: 5,
    color: colors.primary,
    fontWeight: "bold",
  },

  textSub: {
    fontSize: 14,
    marginHorizontal: 5,
    color: colors.primary,
    fontWeight: "bold",
  },

  dataView: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
  },
  panel: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
