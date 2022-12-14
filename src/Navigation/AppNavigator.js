import React from "react";
import i18n from "../Config/i18n";
import TimeAndAttendanceScreen from "../Screens/TimeAndAttendanceScreen";
import TaskStack from "./Stacks/TaskStack";
import AccountScreen from "../Screens/AccountScreen";
import CustomTabBarIcon from "../Components/CustomTabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { colors } from "../Styles/Colors";
import { useDispatch, useSelector } from "react-redux";

const BottomTabs = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useSelector((state) => state.auth.value);
  const { selectedShift } = useSelector((state) => state.shifts.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = { id: user.id, token: user.token };
    dispatch(findStartedShiftByWorkerId(params));
  }, [user]);

  return (
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
            return <CustomTabBarIcon focused={focused} text={i18n.t("tab.timeAndAttendance")} iconName={"stopwatch"} />;
          },
        }}
      />
    </BottomTabs.Navigator>
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
