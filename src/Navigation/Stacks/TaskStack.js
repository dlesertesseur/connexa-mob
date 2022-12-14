import React from "react";
import ScanScreen from "../../Screens/ScanScreen";
import WorkShitListScreen from "../../Screens/WorkShitListScreen";
import StartWorkShiftScreen from "../../Screens/StartWorkShiftScreen";
import OptionsMenuScreen from "../../Screens/OptionsMenuScreen";
import NonWorkingTimeScreen from "../../Screens/Options/NonWorkingTimeScreen";
import NotFoundScreen from "../../Screens/NotFoundScreen";
import WorkOrderScreen from "../../Screens/Options/WorkOrder/WorkOrderScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FinalizeWorkShiftScreen from "../../Screens/FinalizeWorkShiftScreen";


const Stack = createNativeStackNavigator();

const TaskStack = () => {

  const { selectedShift } = useSelector((state) => state.shifts.value);

  return (
    <Stack.Navigator
      initialRouteName={selectedShift ? "OptionsMenu" : "WorkShitList"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WorkShitList" component={WorkShitListScreen}></Stack.Screen>
      <Stack.Screen name="scanScreen" component={ScanScreen}></Stack.Screen>
      <Stack.Screen name="StartWorkShift" component={StartWorkShiftScreen}></Stack.Screen>
      <Stack.Screen name="OptionsMenu" component={OptionsMenuScreen}></Stack.Screen>
      <Stack.Screen name="NonWorkingTime" component={NonWorkingTimeScreen}></Stack.Screen>
      <Stack.Screen name="WorkOrder" component={WorkOrderScreen}></Stack.Screen>
      <Stack.Screen name="NotFound" component={NotFoundScreen}></Stack.Screen>
      <Stack.Screen name="FinalizeWorkShift" component={FinalizeWorkShiftScreen}></Stack.Screen>
      
    </Stack.Navigator>
  );
};

export default TaskStack;