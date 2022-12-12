import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
//import ProductsListScreen from "./ProductsListScreen";

import { StyleSheet, View } from "react-native";
import { colors } from "../../../Styles/Colors";
import ScanScreen from "../../ScanScreen";
import ProductsListScreen from "./ProductsListScreen";

const Stack = createNativeStackNavigator();
const WorkOrderScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductsList" component={ProductsListScreen} />
      <Stack.Screen
        name="ScanProduct"
        component={ScanScreen}
      />
    </Stack.Navigator>
  );
};

export default WorkOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
