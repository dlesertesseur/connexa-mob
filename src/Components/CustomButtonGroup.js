import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";

const CustomButtonGroup = ({ disabled = false, actions = [], value, setValue }) => {
  return (
    <View
      style={{
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: ui.margin,
      }}
    >
      {actions?.map((a, index) => {
        const ret = (
          <View key={a} style={{ flex: 1 }}>
            <TouchableHighlight
              style={{
                height: 40,
                borderTopLeftRadius: index === 0 ? ui.borderRadius : 0,
                borderBottomLeftRadius: index === 0 ? ui.borderRadius : 0,
                borderTopRightRadius: index === actions.length - 1 ? ui.borderRadius : 0,
                borderBottomRightRadius: index === actions.length - 1 ? ui.borderRadius : 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: disabled || a === value ? colors.primary : colors.inactive,
                marginHorizontal: 1,
              }}
              onPress={() => {
                setValue(a);
              }}
              disabled={disabled}
            >
              <Text style={styles.text}> {a} </Text>
            </TouchableHighlight>
          </View>
        );
        return ret;
      })}
    </View>
  );
};

export default CustomButtonGroup;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
  },
});
