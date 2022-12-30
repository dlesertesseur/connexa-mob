import AuthStack from "./Stacks/AuthStack";
import AppNavigator from "./AppNavigator";
import DocumentsStack from "./Stacks/DocumentsStack";
import VerifyingStack from "./Stacks/VerifyingStack";
import * as Location from "expo-location";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { status } from "../Config/Constants";
import { registerLocation } from "../DataAccess/LocationDao";
import { setActualLocation } from "../Features/Location";
import NoPermissionScreen from "../Screens/NoPermissionScreen";

let watchID = null;

export default MainNavigator = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  const [userLogged, setUserLogged] = useState(false);
  const [reportLocation, setReportLocation] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [activateLocation, setActivateLocation] = useState(false);

  useEffect(() => {
    (async () => {
      //const locationStatus = await Location.requestBackgroundPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus.status === "granted");
    })();
  }, []);

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

  useEffect(() => {
    if (userLogged && user.status === status.ACTIVED) {
      console.log("startLocationReport -> start watchID");
      Location.watchPositionAsync({ accuracy: 6, timeInterval: 5000 }, (position) => {
        dispatch(setActualLocation(position.coords));

        if (reportLocation) {
          const params = {
            id: user.id,
            token: user.token,
            coords: position.coords,
          };
          registerLocation(params).then((rta) => {
            if (rta.error) {
              console.log("registerLocation RTA -> ", rta);
            }
          });
        }
      }).then((ret) => (watchID = ret));
    } else {
      if (watchID) {
        console.log("stopLocationReport <-  watchID.remove()");
        watchID.remove();
        dispatch(setActualLocation(null));
        watchID = null;
      }
    }
  }, [userLogged]);

  const determinateStack = () => {
    let ret = null;

    switch (user.status) {
      case status.PENDING_DOCUMENTS:
        ret = <DocumentsStack />;
        break;

      case status.VERIFYING_IDENTITY:
        ret = <VerifyingStack />;
        break;

      case status.ACTIVED:
        ret = <AppNavigator />;
        break;

      default:
        break;
    }
    return ret;
  };

  if (hasLocationPermission === false) {
    return <NoPermissionScreen />;
  } else {
    return (
      <NavigationContainer>
        <SafeAreaView style={styles.container}>{!userLogged ? <AuthStack /> : determinateStack()}</SafeAreaView>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.background,
  },
});
