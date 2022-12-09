import React from "react";
import ScanScreen from "../../Screens/ScanScreen";
import WorkShitListScreen from "../../Screens/WorkShitListScreen";
import StartWorkShiftScreen from "../../Screens/StartWorkShiftScreen";
import OptionsMenuScreen from "../../Screens/OptionsMenuScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const TaskStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WorkShitList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WorkShitList" component={WorkShitListScreen}></Stack.Screen>
      <Stack.Screen name="scanScreen" component={ScanScreen}></Stack.Screen>
      <Stack.Screen name="StartWorkShift" component={StartWorkShiftScreen}></Stack.Screen>
      <Stack.Screen name="OptionsMenu" component={OptionsMenuScreen}></Stack.Screen>
      
    </Stack.Navigator>
  );
};

export default TaskStack;