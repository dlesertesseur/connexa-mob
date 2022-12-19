import React from "react";
import MapView, { Marker, Circle } from "react-native-maps";

import i18n from "../Config/i18n";
import { StyleSheet, View } from "react-native";
import CustomTitleBar from "../Components/CustomTitleBar";
import { colors } from "../Styles/Colors";
import { useSelector } from "react-redux";

const TimeAndAttendanceScreen = () => {
  const { actualLocation } = useSelector((state) => state.shifts.value);
  const { user } = useSelector((state) => state.auth.value);

  return (
    <View style={styles.container}>
      <CustomTitleBar
        title={i18n.t("title.screen.location")}
        marginBottom={0}
      />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -34.5991825,
          longitude: -58.4827121,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          key={1}
          coordinate={{
            latitude: actualLocation.latitude,
            longitude: actualLocation.longitude,
          }}
          title={user.names + ", " + user.surnames}
          description={user.phoneNumber}
        />

        <Circle
          key={2}
          center={{
            latitude: actualLocation.latitude,
            longitude: actualLocation.longitude,
          }}
          radius={500}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
      </MapView>
    </View>
  );
};

export default TimeAndAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
