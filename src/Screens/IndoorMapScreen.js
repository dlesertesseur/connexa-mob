import React, { useEffect } from "react";

import i18n from "../Config/i18n";
import CustomTitleBar from "../Components/CustomTitleBar";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { findParameterById } from "../DataAccess/ParameterDao";
import { useState } from "react";

const IndoorMapScreen = () => {

  const [url, setUrl] = useState(null);

  useEffect(() => {
    const parameters = {id:58}
    findParameterById(parameters).then((ret) => {
      setUrl(ret.value)
    })
  }, []);

  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.location")} marginBottom={0} />
      <View style={{ flex: 1, backgroundColor: colors.background, borderWidth: 1, marginBottom: 70 }}>
        {url ? <WebView style={styles.container} source={{ uri: url }} /> : null}
      </View>
    </View>
  );
};

export default IndoorMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
