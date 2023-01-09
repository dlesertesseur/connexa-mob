import React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ui } from "../Config/Constants";
import { colors } from "../Styles/Colors";

const CustomButtonGroup = ({ disabled = false, actions = [] }) => {
  const [buttonPressed, setButtonPressed] = useState(null);
  
  const determinateSeparation = (cuantity) => {
    let sep = 0;
    if(cuantity > 0 && cuantity < 3 ){
      sep = 1;
    }else{
      sep = 0;
    }

    return(sep);
  }

  const separation = determinateSeparation(actions.length);

  return (
    <View
      style={{
        height:60,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: ui.margin,
      }}
    >
      {actions.map((a, index) => {
        const ret = <View style={{ flex: 1 }}>
        <TouchableHighlight
          style={{
            height: 50,
            borderTopLeftRadius: index===0 ? ui.borderRadius : 0,
            borderBottomLeftRadius: index===0 ? ui.borderRadius : 0,
            borderTopRightRadius: (index=== actions.length-1)? ui.borderRadius : 0,
            borderBottomRightRadius: (index=== actions.length-1) ? ui.borderRadius : 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: disabled || a === buttonPressed ? colors.primary : colors.inactive,
            // marginRight: index===0 ? separation : 0,
            // marginLeft: (index=== actions.length-1) ? separation : 0,
            marginHorizontal: 1,
          }}
          onPress={() => {
            setButtonPressed(a);
          }}
          disabled={disabled}
        >
          <Text style={styles.text}> {a} </Text>
        </TouchableHighlight>
      </View>;
        return(ret);
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
