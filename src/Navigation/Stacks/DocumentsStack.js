import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DocumentsListScreen from "../../Screens/DocumentsListScreen";
import ShowImageScreen from "../../Screens/ShowImageScreen";
import TakePhotoScreen from "../../Screens/TakePhotoScreen";
import VerifyingDataScreen from "../../Screens/VerifyingDataScreen";

const Stack = createNativeStackNavigator();

const DocumentsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DocumentsList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DocumentsList" component={DocumentsListScreen}></Stack.Screen>
      <Stack.Screen name="ShowImage" component={ShowImageScreen}></Stack.Screen>
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen}></Stack.Screen>
      <Stack.Screen name="VerifyingData" component={VerifyingDataScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default DocumentsStack;