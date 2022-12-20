import React from "react";
import ScanProducScreen from "../../ScanProducScreen";
import FrontingScreen from "./FrontingScreen";
import ScanLocationScreen from "../../ScanLocationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../Styles/Colors";


const Stack = createNativeStackNavigator();
const ActivitiesScreen = ({ route }) => {

  const param = route.params;
  return (
    <Stack.Navigator
      initialRouteName="Fronting"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Fronting" component={FrontingScreen} initialParams={param} />
      <Stack.Screen name="ScanLocation" component={ScanLocationScreen}></Stack.Screen>

    </Stack.Navigator>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
