import i18n from "../Config/i18n";
import React from "react";

import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ui } from "../Config/Constants";

import WorkShiftItem from "../Components/WorkShiftItem";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomText from "../Components/CustomText";
import CustomButton from "../Components/CustomButton";

const WorkShitListScreen = ({ navigation }) => {

  const { user } = useSelector((state) => state.auth.value);

  const [workShift, setWorkShift] = useState(require("../DataAccess/workShift.json"));

  useEffect(() => {}, [user]);

  const onPressShitf = (item) => {
    navigation.navigate("StartWorkShift", item);
  };

  const renderShit = (props) =>{
    return (<WorkShiftItem item={props.item} onPress={onPressShitf}/>)
  }

  return (
    <View style={styles.container}>
      <HorizontalSeparator />
      <CustomText
        title={i18n.t("title.screen.workshiftList")}
        fontSize={28}
        color={colors.primary}
      />
      <HorizontalSeparator />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          marginHorizontal: 15,
          marginBottom: 15
        }}
      >
        <FlatList
          data={workShift}
          renderItem={renderShit}
          keyExtractor={(item) => item.id}
        />
      </View>

    </View>
  );
};

export default WorkShitListScreen;

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
