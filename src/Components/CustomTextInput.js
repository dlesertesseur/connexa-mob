import { StyleSheet, Text, View, TextInput } from "react-native";
import { colors } from "../Styles/Colors";
import { Controller } from "react-hook-form";

const CustomTextInput = ({ control, name, placeholder, rules, password = false, style, focusRef }) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={[styles.container, style]}>
          <TextInput
            style={[styles.inputText, { borderColor: error ? colors.error : colors.primary }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            secureTextEntry={password}
            ref={focusRef}
          />
          {error ? <Text style={styles.error}>{error.message}</Text> : null}
        </View>
      )}
      name={name}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputText: {
    width: "100%",
    borderRadius: 8,
    padding: 10,
    color: colors.font,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.primary,
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
});
