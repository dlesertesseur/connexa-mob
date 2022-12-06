import React from "react";
import VerifyingDataScreen from "../../Screens/VerifyingDataScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const VerifyingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="taskListScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="VerifyingData" component={VerifyingDataScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default VerifyingStack;