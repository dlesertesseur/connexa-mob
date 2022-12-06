import { StyleSheet, View, TextInput } from "react-native";
import { colors } from "../Styles/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { ui } from "../Config/Constants";

const CustomSearchInput = ({ placeholder, style, value, setValue }) => {

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputText}>
        <TextInput
          onChangeText={setValue}
          value={value}
          placeholder={placeholder}
          fontSize={18}
        />
      </View>

      {/* <TouchableOpacity style={styles.button} onPress={() => onSearch(value)}>
        <FontAwesome5 name="search" size={24} color={colors.secondary} />
      </TouchableOpacity> */}

      <View style={styles.button}>
        <FontAwesome5 name="search" size={24} color={colors.primary} />
      </View>
      
    </View>
  );
};

export default CustomSearchInput;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    margin:15,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: ui.borderRadius,
    padding: 5,
  },

  inputText: {
    flex: 1,
    color: colors.font,
    fontSize: 18,
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight:5
  },

  error: {
    width: "100%",
    padding: 2,
    color: colors.error,
    fontSize: 11,
    marginBottom: 15,
  },

  separator: {
    width: "100%",
    padding: 2,
    marginBottom: 15,
  },

  button: {
    padding: 5,
    borderRadius: ui.borderRadius,
    justifyContent: "center",
    alignItems: "center"
  },
});
