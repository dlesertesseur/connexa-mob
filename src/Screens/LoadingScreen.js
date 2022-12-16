import i18n from "../Config/i18n";
import CustomImage from "../Components/CustomImage";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomText from "../Components/CustomText";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { colors } from "../Styles/Colors";

const LoadingScreen = ({ navigation, title, footerText }) => {
  const logo = require("../../assets/images/logo-banner.png");

  return (
    <View style={styles.container}>
      <CustomImage source={logo} style={styles.logo} />
      <CustomText title={title} fontSize={28} color={colors.primary} />
     
      <View style={styles.imgPanel}>
        <ActivityIndicator color={colors.primary} size={48}/>
      </View>

      <View style={styles.panel}>
        <CustomText title={footerText} fontSize={16} color={colors.primary} />
      </View>
    </View>
  );
};

export default LoadingScreen;

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
    justifyContent: "center",
  },

  imgPanel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});