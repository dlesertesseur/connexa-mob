import React from "react";
import { StyleSheet, Text, View } from 'react-native'

const CenterTextScreen = ({text, backgroundColor="#FFFFFF"}) => {
  return (
    <View style={[styles.container, {backgroundColor:backgroundColor}]}>
      <Text>{text}</Text>
    </View>
  );
};

export default CenterTextScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:782,
    justifyContent: "center",
    alignItems: "center",
  },
});
