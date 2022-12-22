import React, { useEffect, useState } from "react";
import i18n from "../../Config/i18n";
import CustomText from "../../Components/CustomText";
import HorizontalSeparator from "../../Components/HorizontalSeparator";
import CustomButton from "../../Components/CustomButton";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { colors } from "../../Styles/Colors";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  DangerPath,
  Indicator,
} from "react-native-cool-speedometer";
import CustomTitleBar from "../../Components/CustomTitleBar";

const NonWorkingTimeScreen = ({ navigation, route }) => {
  const option = route.params;
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalTime, setTotalTime] = useState(30);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
  //   return () => backHandler.remove()
  // }, [])

  useEffect(() => {
    let timeout = null;
    if (timeElapsed < totalTime) {
      timeout = setTimeout(() => {
        setTimeElapsed(timeElapsed + 1);
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [timeElapsed]);

  return (
    <View style={styles.container}>
      <CustomTitleBar title={option.title} />
      <CustomText
        title={i18n.t("title.screen.nonWorkingTime")}
        fontSize={28}
        color={colors.primary}
      />
      <HorizontalSeparator />
      <CustomText
        text={i18n.t("title.screen.nonWorkingTime-desc")}
        fontSize={18}
        color={colors.primary}
      />
      <HorizontalSeparator height={30}/>
      <CustomText
        title={option.title}
        fontSize={28}
        
      />
      <View style={styles.imgPanel}>
        <Speedometer
          value={timeElapsed}
          max={totalTime}
          rotation={-90}
          fontFamily="squada-one"
          width={300}
        >
          <Background opacity={0.3} />
          <Arc arcWidth={4} />
          <Needle
            baseOffset={10}
            circleRadius={20}
            circleColor={colors.primary}
          />
          <DangerPath offset={10} angle={42.5} />
          <Progress arcWidth={12} color={colors.primary} />
          <Marks step={2.5} fontSize={20} />
          {/* <Indicator color={colors.primary}/> */}
        </Speedometer>

        {/* <Speedometer
          value={timeElapsed}
          max={totalTime}
          angle={360}
          lineCap="round"
          width={300}
          accentColor={colors.primary}
        >
          <Background color={colors.primaryLighter} />
          <Arc arcWidth={40} color={colors.primary} />
          <Progress arcWidth={40} />
        </Speedometer> */}
      </View>

      <View style={styles.panel}>
        <CustomButton text={i18n.t("button.finish")} onPress={() => {navigation.goBack()}} />
      </View>
    </View>
  );
};

export default NonWorkingTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  logo: {
    marginTop: 30,
  },

  picture: {
    resizeMode: "center",
  },

  panel: {
    margin: 15,
    justifyContent: "flex-end",
    marginBottom: 15,
  },

  imgPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
