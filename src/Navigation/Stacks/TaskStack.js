import React from "react";
import TaskListScreen from "../../Screens/TaskListScreen";
import ScanScreen from "../../Screens/ScanScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const TaskStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="taskListScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="taskListScreen" component={TaskListScreen}></Stack.Screen>
      <Stack.Screen name="scanScreen" component={ScanScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default TaskStack;