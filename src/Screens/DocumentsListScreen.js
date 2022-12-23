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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { documentStatus, status, ui } from "../Config/Constants";
import { setDocument, updateWorker } from "../Features/Auth";
import { findAllImagesByWorkerId, findDocumentsTemplateByCountry } from "../DataAccess/DocumentsDao";
import { API } from "../Config/Api";
import CustomButton from "../Components/CustomButton";

const DocumentsListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);

  const [searchText, setSearchText] = useState(null);
  const [templates, setTemplates] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  const logo = require("../../assets/images/logo-banner.png");
  const noDocument = require("../../assets/images/noPhoto.png");

  const { updatedDocument } = useSelector((state) => state.auth.value);

  useEffect(() => {
    const params = {
      country: user.country.toUpperCase(),
      token: user.token,
    };

    findDocumentsTemplateByCountry(params).then((templates) => {
      setTemplates(templates);
    });
  }, [user, updatedDocument]);

  useEffect(() => {
    if (templates) {
      const params = {
        id: user.id,
        token: user.token,
      };

      findAllImagesByWorkerId(params).then((images) => {
        const imageByType = Object.assign({}, ...images.map((x) => ({ [x.type]: x })));
        const docs = templates?.map((t) => {
          img = imageByType[t.name];
          const doc = { ...t };

          doc.labelText = i18n.t("documents.ids." + t.name);
          doc.description = i18n.t("documents.desc." + t.name);
          if (img) {
            doc.url = API.document.baseImageUrl + img.path;
            doc.status = documentStatus.ACTIVE;
          } else {
            doc.url = null;
            doc.status = documentStatus.PENDING;
          }

          return doc;
        });

        setDocuments(docs);
        setFilteredDocuments(docs);
      });
    }
  }, [templates]);

  useEffect(() => {
    if (searchText) {
      const filtered = documents.filter((c) => c.labelText.startsWith(searchText));
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchText]);

  const startValidationProcess = () => {
    const u = {...user}
    u.status = status.VERIFYING_IDENTITY;
    u.toke = "";

    const params = {
      id:user.id,
      token:user.token,
      data:u
    }

    dispatch(updateWorker(params)).then((ret) => {
      navigation.navigate("VerifyingData");
    });
  };

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

  const determinateIcon = (status) => {
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
        onPress={() => {
          dispatch(setDocument(item));
          navigation.navigate("ShowImage");
        }}
      >
        <View
          style={{
            marginRight: index % 2 === 0 ? 5 : 0,
            marginLeft: index % 2 > 0 ? 5 : 0,
            marginBottom: 10,
            flex: 1,
            padding: 0,
            // borderRadius: ui.borderRadius,
            // borderWidth: ui.borderWidth,
            borderColor: colors.primary,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: colors.background,
          }}
        >
          {/* <Image source={item.url ? { uri: item.url } : noDocument} resizeMode={"cover"} style={styles.image} /> */}
          <Image source={item.url ? { uri: item.url } : null} resizeMode={"cover"} style={styles.image} />

          <View style={styles.dataView}>
            <View style={styles.panel}>
              <View
                style={{
                  margin: 5,
                }}
              >
                <Text style={styles.text}>{item.labelText}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 10,
                  alignItems: "center",
                }}
              >
                {item.validityInMonths > 0 ? (
                  <>
                    <FontAwesome name="calendar" size={18} color={colors.primary} />
                    <Text style={styles.textSub}>{item.validityInMonths + " " + i18n.t("label.months")}</Text>
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
              {determinateIcon(item.status)}
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

      <CustomSearchInput placeholder={i18n.t("label.search")} value={searchText} setValue={setSearchText} />

      <DocumentsList data={filteredDocuments} renderItem={renderItem} />
      <HorizontalSeparator />
      <View style={styles.btPanel}>
        <CustomButton text={i18n.t("button.startValidationProcess")} onPress={startValidationProcess} />
      </View>
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
    backgroundColor:colors.primaryLighter
  },

  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
    backgroundColor: colors.pending,
  },
  
  panel: {
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  btPanel: {
    marginHorizontal: 15,
    marginBottom: 15,
  },
});
