import i18n from "../Config/i18n";
import HorizontalSeparator from "../Components/HorizontalSeparator";
import CustomText from "../Components/CustomText";
import { StyleSheet, View } from "react-native";
import { colors } from "../Styles/Colors";
import UserCard from "../Components/UserCard";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HorizontalSeparator />
      <CustomText title={i18n.t("title.screen.account")} fontSize={28} color={colors.primary} />
      <HorizontalSeparator />

      <View style={styles.bodyPanel}>
        <UserCard/>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  panel: {
    margin: 15,
    justifyContent: "flex-end",
  },

  bodyPanel: {
    margin:15,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "#ff0000",
    borderWidth:1,
  },
});
