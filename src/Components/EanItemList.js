import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import { colors } from "../Styles/Colors";

const EanItemList = (props) => {
  const { item, onPress=()=>console.log("onPress") } = props;

  const onPressLocal = () => {
    onPress(item);
  };

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={onPressLocal}>
        <Text style={styles.text}>{item.ean}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EanItemList;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
    marginBottom:10,
    borderColor:colors.primaryDarker,
  },

  text: {
    alignItems: "center",
    marginLeft: 5,
    fontSize: 16,
    color:colors.primaryDarker,
  },

  image: {
    width: 24,
    height: 24,
  },
});
