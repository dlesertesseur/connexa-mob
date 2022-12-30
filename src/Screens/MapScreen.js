import React, { useEffect, useState } from "react";
import MapView, { Marker, Circle, Callout } from "react-native-maps";

import i18n from "../Config/i18n";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomTitleBar from "../Components/CustomTitleBar";
import { colors } from "../Styles/Colors";
import { useSelector } from "react-redux";
import { ui } from "../Config/Constants";

const MapScreen = () => {
  const { actualLocation } = useSelector((state) => state.location.value);
  const { user, profileImage } = useSelector((state) => state.auth.value);
  const { selectedShift } = useSelector((state) => state.shifts.value);

  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    if (selectedShift) {
      setInitialRegion({
        latitude: parseFloat(selectedShift.siteLatitude),
        longitude: parseFloat(selectedShift.siteLongitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [selectedShift]);

  return (
    <View style={styles.container}>
      <CustomTitleBar title={i18n.t("title.screen.location")} marginBottom={0} />
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {actualLocation ? (
          <>
            <Marker
              key={user.id}
              coordinate={{
                latitude: actualLocation.latitude,
                longitude: actualLocation.longitude,
              }}
            >
              <View style={{}}>
                <Image source={{ uri: profileImage }} style={{ width: 42, height: 42, borderRadius: 90 }} />
              </View>

              <Callout
                style={{
                  width: 200,
                }}
              >
                <View
                  style={{
                    margin: 5,
                    flex: 1,
                  }}
                >
                  <Text>{user.lastname + ", " + user.firstname} </Text>
                </View>
              </Callout>
            </Marker>

            {selectedShift ? (
              <>
                <Circle
                  key={3}
                  center={{
                    latitude: parseFloat(selectedShift.siteLatitude),
                    longitude: parseFloat(selectedShift.siteLongitude),
                  }}
                  radius={selectedShift.siteRadiusInMeters}
                  strokeWidth={1}
                  strokeColor={"#1a66ff"}
                  fillColor={"rgba(230,238,255,0.5)"}
                />
                <Marker
                  key={user.id}
                  coordinate={{
                    latitude: parseFloat(selectedShift.siteLatitude),
                    longitude: parseFloat(selectedShift.siteLongitude),
                  }}
                  title={selectedShift.siteName}
                  description={selectedShift.notes}
                />
              </>
            ) : null}
          </>
        ) : null}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
