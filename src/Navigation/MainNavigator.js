import AuthStack from "./Stacks/AuthStack";
import AppNavigator from "./AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { status } from "../Config/Constants";
import DocumentsStack from "./Stacks/DocumentsStack";

export default MainNavigator = () => {
  const { user } = useSelector((state) => state.auth.value);

  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.token) {
        setUserLogged(user.token.length > 0);
      } else {
        setUserLogged(false);
      }
    } else {
      setUserLogged(false);
    }
  }, [user]);

  const determinateStack = () => {
    if(user.status === status.PENDING_DOCUMENTS){
      return(<DocumentsStack />);
    }else{
      return(<AppNavigator />);
    }
  }


  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>{!userLogged ? <AuthStack /> : determinateStack()}</SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.background,
  },
});
