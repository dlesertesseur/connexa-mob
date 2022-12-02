import React from "react";
import SignUpScreen from "../../Screens/SignUpScreen";
import TakePhotoScreen from "../../Screens/TakePhotoScreen";
import SignInScreen from "../../Screens/SignInScreen";
import WelcomeScreen from "../../Screens/WelcomeScreen";
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
      <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
      <Stack.Screen name="TakePhoto" component={TakePhotoScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;

