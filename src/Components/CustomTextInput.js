import { StyleSheet, Text, View, TextInput } from "react-native";
import { colors } from "../Styles/Colors";
import { Controller } from "react-hook-form";
import { ui } from "../Config/Constants";

const CustomTextInput = ({
  control,
  name,
  placeholder,
  rules,
  password = false,
  focusRef,
  getIcon = null,
  editable = true,
}) => {
  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <View style={[styles.container, { borderColor: error ? colors.error : colors.primary }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                editable={editable}
                style={{
                  flex: 1,
                  marginRight: 5,
                  color: editable ? colors.font : colors.fontDisabled,
                  fontSize: 18,
                }}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeholder}
                secureTextEntry={password}
                ref={focusRef}
                fontSize={18}
              />
              <View
                style={{
                  justifyContent: "center",
                }}
              >
                {getIcon ? getIcon(error) : null}
              </View>
            </View>
          </View>
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
    borderWidth: 1,
    borderRadius: ui.borderRadius,
    padding: 10,
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
