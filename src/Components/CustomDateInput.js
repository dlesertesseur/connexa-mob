import MaskInput from "react-native-mask-input";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Styles/Colors";
import { Controller } from "react-hook-form";
import { FontAwesome5 } from "@expo/vector-icons";
import { ui } from "../Config/Constants";

const CustomDateInput = ({
  control,
  name,
  rules,
  password = false,
  style,
  focusRef,
  editable = true,
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[styles.container, style]}>
          <View
            style={[
              styles.inputText,
              {
                borderColor: error ? colors.error : colors.primary,
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <MaskInput
              editable={editable}
              onBlur={onBlur}
              onChangeText={(masked, unmasked) => {
                onChange(masked);
              }}
              value={value}
              secureTextEntry={password}
              ref={focusRef}
              fontSize={18}
              mask={[/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]}
              placeholderFillCharacter={"-"}
            />
            <FontAwesome5
              name="birthday-cake"
              size={24}
              color={error ? colors.error : colors.primary}
            />
          </View>
          {error ? <Text style={styles.error}>{error.message}</Text> : null}
        </View>
      )}
      name={name}
    />
  );
};

export default CustomDateInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputText: {
    width: "100%",
    borderRadius: ui.borderRadius,
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
