import { Alert } from "react-native";
import i18n from "../Config/i18n";

const showAlert = (title, message, onClose) =>
  Alert.alert(title, message, [{ text: i18n.t("button.close"), onPress: onClose }]);

const getDateFromStr = (dateAndTime) => {
  const [dateValues, timeValues] = dateAndTime.split(" ");
  const [year, month, day] = dateValues.split("-");
  const [hours, minutes, seconds] = timeValues.split(":");

  const ret = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  return ret;
};

function subtractMinutes(numOfMinutes, date) {
  date.setMinutes(date.getMinutes() - numOfMinutes);
  return date;
}

// const getMonth = (yyyyMMdd) => {
//   const [dateValues, timeValues] = yyyyMMdd.split(" ");
//   const [year, month, day] = dateValues.split("-");
//   const ret = i18n.t("month." + month);
//   return ret;
// };

// const getDay = (yyyyMMdd) => {
//   const [dateValues, timeValues] = yyyyMMdd.split(" ");
//   const [year, month, day] = dateValues.split("-");
//   return day;
// };

// const getWeekDay = (yyyyMMdd) => {
//   const [dateValues, timeValues] = yyyyMMdd.split(" ");
//   const [year, month, day] = dateValues.split("-");
//   const [hours, minutes, seconds] = timeValues.split(":");

//   const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);

//   const ret = i18n.t("day." + date.getDay());
//   return ret;
// };

// const getTime = (dateAndTime) => {
//   const [dateValues, timeValues] = dateAndTime.split(" ");
//   const [hours, minutes, seconds] = timeValues.split(":");
//   return hours + ":" + minutes;
// };

const zeroPad = (num, places) => String(num).padStart(places, '0')

export { showAlert, getDateFromStr, subtractMinutes, zeroPad};
