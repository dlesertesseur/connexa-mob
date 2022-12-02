import React from "react";
import Swiper from "react-native-swiper";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { useState } from "react";

const ImageList = ({ pictures }) => {
  return (
    <View style={styles.container_card}>
      <Swiper
        style={styles.swipe}
        pagingEnabled={true}
        loop={false}
        showsPagination={false}
        removeClippedSubviews={false}
      >
        {pictures?.map((img, index) => {
          console.log("image " + index, img);
          return (
            <Image
              key={index}
              source={{ uri: img }}
              style={{
                width: "100%",
                height: 200,
                borderWidth: 2,
                borderRadius: 8,
                borderColor: colors.lightBlue,
                marginBottom: 15,
              }}
            />
          );
        })}
      </Swiper>
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  container_card: {
    height: 210,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  swipe: {
    //height:220,
  },

  slide: {
    paddingHorizontal: 5,
    height: 200,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLighter,
  },

  slideFinal: {
    marginRight: 10,
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
