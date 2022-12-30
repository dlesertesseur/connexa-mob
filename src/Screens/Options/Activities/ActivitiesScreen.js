import React from "react";
import ScanLocationScreen from "../../ScanLocationScreen";
import ActivityWithLocationScreen from "./ActivityWithLocationScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { colors } from "../../../Styles/Colors";

const Stack = createNativeStackNavigator();
const ActivitiesScreen = ({ route }) => {

  const param = route.params;
  return (
    <Stack.Navigator
      initialRouteName="ActivityWithLocation"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ActivityWithLocation" component={ActivityWithLocationScreen} initialParams={param} />
      <Stack.Screen name="ScanLocation" component={ScanLocationScreen} initialParams={{backScreen:"ActivityWithLocation"}}></Stack.Screen>

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
