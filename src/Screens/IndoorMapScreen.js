import React from "react";

import i18n from "../Config/i18n";
import CustomTitleBar from "../Components/CustomTitleBar";

import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";


const IndoorMapScreen = () => {

  return (
    <View style={styles.container}>
      <CustomTitleBar
        title={i18n.t("title.screen.location")}
        marginBottom={0}
      />
      
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
