import React, { useState } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";
import Swiper from "react-native-swiper";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import CustomLabel from "../Components/CustomLabel";
import HorizontalSeparator from "../Components/HorizontalSeparator";

const AccountScreen = () => {
  const [buttons] = useState(["1", "2", "3", "4", "5", "6", "7"]);

  return (
    <View style={styles.container}>
      <HorizontalSeparator />
      <CustomLabel title={"Account Screen"} />
      {/* <View style={styles.container_card}>
        <Swiper
          style={styles.swipe}
          pagingEnabled={true}
          loop={false}
          showsPagination={false}
          removeClippedSubviews={false}
        >
          {buttons.map((index, bt) => {
            return (
              <View key={index} style={styles.slide1}>
                <Text style={styles.text}>{bt}</Text>
              </View>
            );
          })}
        </Swiper>
      </View> */}

      {/* <View style={styles.container_bt}>
        <SwiperFlatList style={styles.swipe} pagingEnabled={false} loop={false}>
          {buttons.map((index, bt) => {
            return (
              <View
                key={index}
                style={[
                  styles.slide,
                  index == buttons.length ? styles.slideFinal : null,
                ]}
              >
                <Text style={styles.text}>{bt}</Text>
              </View>
            );
          })}
        </SwiperFlatList>
      </View> */}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
  },

  container_bt: {
    height: 110,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

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
    marginTop: 10,
    marginLeft: 10,
    height: 100,
    width: 100,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },

  slide1: {
    marginTop: 10,
    marginHorizontal: 10,
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
