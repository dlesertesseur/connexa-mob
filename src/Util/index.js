import { Alert } from "react-native";
import i18n from "../Config/i18n";
import haversine from "haversine-distance";

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

function onTime(start, end) {
  let ret = false;
  const localTime = new Date();
  if (localTime >= start && localTime <= end) {
    ret = true;
  }

  return ret;
}

function onLocation(lat1, long1, lat2, long2, siteRadiusInMeters = 100) {
  const a = { latitude: lat1, longitude: long1 };
  const b = { latitude: lat2, longitude: long2 };
  const distance = haversine(a, b, { unit: "meter" });

  const ret = distance <= siteRadiusInMeters;
  return ret;
}

function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { h: hours, m: minutes, s: seconds };
}


const zeroPad = (num, places) => String(num).padStart(places, '0')

export { showAlert, getDateFromStr, subtractMinutes, zeroPad, onTime, onLocation, toHoursAndMinutes};
