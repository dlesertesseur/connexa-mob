import React from "react";
import ProductsListScreen from "./ProductsListScreen";
import StartActivityScreen from "./StartActivityScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { colors } from "../../../Styles/Colors";

const Stack = createNativeStackNavigator();
const WarehousePickingScreen = ({ route }) => {
  const param = route.params;
  return (
    <Stack.Navigator
      initialRouteName="StartActivity"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartActivity" component={StartActivityScreen} initialParams={param} />
      <Stack.Screen name="ProductsList" component={ProductsListScreen} initialParams={param} />
    </Stack.Navigator>
  );
};

export default WarehousePickingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
