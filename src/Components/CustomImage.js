import React from "react";
import { Image, StyleSheet, View } from "react-native";

const CustomImage = ({style, source}) => {

  return (
    <View style={[styles.container, style]}>
      <Image source={source} style={styles.img} resizeMode="center"/>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: "100%",
    height: "100%",
  },
});
