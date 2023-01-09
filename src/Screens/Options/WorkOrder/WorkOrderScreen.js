import React from "react";
import ScanProducScreen from "../../ScanProducScreen";
import ProductsListScreen from "./ProductsListScreen";
import NumberOfUnitsScreen from "./NumberOfUnitsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { colors } from "../../../Styles/Colors";
import ProducDetailScreen from "../../ProducDetailScreen";

const Stack = createNativeStackNavigator();
const WorkOrderScreen = ({ route }) => {
  const param = route.params;
  return (
    <Stack.Navigator
      initialRouteName="ProductsList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductsList" component={ProductsListScreen} initialParams={param} />
      <Stack.Screen name="ScanProduct" component={ScanProducScreen} />
      <Stack.Screen name="NumberOfUnits" component={NumberOfUnitsScreen} initialParams={param} />
      <Stack.Screen name="ProductDetail" component={ProducDetailScreen} initialParams={param} />
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
