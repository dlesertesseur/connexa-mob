import { Alert } from "react-native";
import i18n from "../Config/i18n";

const showAlert = (title, message, onClose) =>
    Alert.alert(
      title,
      message,
      [
        { text: i18n.t("button.close"), onPress: onClose }
      ]
    );

export {showAlert};
