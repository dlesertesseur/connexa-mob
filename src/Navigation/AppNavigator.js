import React from "react";
import i18n from "../Config/i18n";
import TimeAndAttendanceScreen from "../Screens/TimeAndAttendanceScreen";
import TaskStack from "./Stacks/TaskStack";
import AccountScreen from "../Screens/AccountScreen";
import CustomTabBarIcon from "../Components/CustomTabBarIcon";
import LoadingScreen from "../Screens/LoadingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findStartedShiftByWorkerId, setActualLocation } from "../Features/Shifts";
import IndoorMapScreen from "../Screens/IndoorMapScreen";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import { registerLocation } from "../DataAccess/LocationDao";

const BottomTabs = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  const { selectedShift, loadingProfile } = useSelector((state) => state.shifts.value);
  const dispatch = useDispatch();
  let watchID = null;

  useEffect(() => {
    const params = { id: user.id, token: user.token };
    dispatch(findStartedShiftByWorkerId(params));
  }, [user]);


  useFocusEffect(
    React.useCallback(() => {
      console.log("AppNavigator <- start watchID");
      Location.watchPositionAsync({ accuracy: 6, timeInterval: 5000 }, (position) => {
        dispatch(setActualLocation(position.coords));

        console.log("setActualLocation() -> ", position.coords)

        const params = {
          id:user.id,
          token:user.token,
          coords:position.coords
        }
        registerLocation(params);  

      }).then((ret) => (watchID = ret));

      return () => {
        console.log("AppNavigator <-  watchID.remove()");
        watchID.remove();
        dispatch(setActualLocation(null));
      };
    }, [user])
  );

  return (
    <>
      {!loadingProfile ? (
        <>
          <BottomTabs.Navigator
            initialRouteName={selectedShift ? "TasksTab" : "UserTab"}
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: styles.tabBar,
            }}
          >
            <BottomTabs.Screen
              name="UserTab"
              component={AccountScreen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return <CustomTabBarIcon text={i18n.t("tab.user")} focused={focused} iconName={"user-alt"} />;
                },
              }}
            />

            <BottomTabs.Screen
              name="TasksTab"
              component={TaskStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return <CustomTabBarIcon focused={focused} text={i18n.t("tab.task")} iconName={"tasks"} />;
                },
                tabBarStyle: { display: "none" },
              }}
            />

            <BottomTabs.Screen
              name="TimeAndAttendanceTab"
              component={TimeAndAttendanceScreen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <CustomTabBarIcon focused={focused} text={i18n.t("tab.timeAndAttendance")} iconName={"stopwatch"} />
                  );
                },
              }}
            />

            <BottomTabs.Screen
              name="IndoorMapTab"
              component={IndoorMapScreen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return <CustomTabBarIcon focused={focused} text={i18n.t("tab.indoorMap")} iconName={"map"} />;
                },
              }}
            />
          </BottomTabs.Navigator>
        </>
      ) : (
        <LoadingScreen title={i18n.t("label.loadingProfile")} footerText={i18n.t("label.waiting")} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 70,
    backgroundColor: colors.primary,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: colors.secondary,
  },
});

export default AppNavigator;
