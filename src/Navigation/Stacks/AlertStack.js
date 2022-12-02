import React from "react";
import OptionsMenuScreen from "../../Screens/OptionsMenuScreen";
import AlertScreen from "../../Screens/Options/AlertScreen";
import ScanLocationScreen from "../../Screens/ScanLocationScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AlertStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="alertOptionsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="optionsMenuScreen" component={OptionsMenuScreen}></Stack.Screen>
      <Stack.Screen name="alertScreen" component={AlertScreen}></Stack.Screen>
      <Stack.Screen name="scanLocationScreen" component={ScanLocationScreen}></Stack.Screen>
      {/* <Stack.Screen name="cameraTest" component={CameraTest}></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default AlertStack;