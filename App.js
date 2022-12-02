import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import MainNavigator from "./src/Navigation/MainNavigator";
import { Provider } from "react-redux";
import Store from "./src/Store";

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  return (
    <Provider store={Store}>
      <SafeAreaProvider style={styles.container}>
        {loaded ? <MainNavigator /> : <ActivityIndicator size="large" />}
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
