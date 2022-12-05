import React from "react";
import SignInScreen from "../../Screens/SignInScreen";
import WelcomeScreen from "../../Screens/WelcomeScreen";
import SelectCountryScreen from "../../Screens/SelectCountryScreen";
import SelectCityScreen from "../../Screens/SelectCityScreen";
import PersonalDataScreen from "../../Screens/PersonalDataScreen";
import CheckCodeScreen from "../../Screens/CheckCodeScreen";
import AccountCreatedSuccessfullyScreen from "../../Screens/AccountCreatedSuccessfullyScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
      <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
      <Stack.Screen name="SelectCountry" component={SelectCountryScreen}></Stack.Screen>
      <Stack.Screen name="SelectCity" component={SelectCityScreen}></Stack.Screen>
      <Stack.Screen name="PersonalData" component={PersonalDataScreen}></Stack.Screen>
      <Stack.Screen name="CheckCode" component={CheckCodeScreen}></Stack.Screen>
      <Stack.Screen name="AccountCreatedSuccessfully" component={AccountCreatedSuccessfullyScreen}></Stack.Screen>
      
    </Stack.Navigator>
  );
};

export default AuthStack;

