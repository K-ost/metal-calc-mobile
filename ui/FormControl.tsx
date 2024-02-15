import { useTheme } from "@react-navigation/native"
import { StyleSheet, TextInput, Text, View } from "react-native"
import { Control, Controller } from "react-hook-form"
import { RootStyles } from "../styles"
import Label from "./Label"

interface IFormControl {
  control: Control<{ mark: string; } | any>
  label: string
  name: string
  required?: boolean
}

const FormControl: React.FC<IFormControl> = ({ control, label, name, required = false }) => {
  const { dark, colors } = useTheme()

  return (
    <Controller
      name={name}
      rules={{
        required: required ? 'Обязательное поле' : undefined,
        min: 1
      }}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.item}>
          <Label title={label} />
          <TextInput
            style={[styles.input, {
              backgroundColor: dark ? '#212121' : RootStyles.COLOR_WHITE,
              borderColor: error ? 'red' : colors.border,
              color: colors.text
            }]}
            onChangeText={onChange}
            placeholder={label}
            placeholderTextColor={RootStyles.COLOR_GRAY}
            inputMode="decimal"
            value={value}
          />
          {error && error.type && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  )
}

export default FormControl

// Styles
export const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: RootStyles.RADIUS,
    height: 50,
    fontSize: 14,
    color: RootStyles.COLOR_DARK,
    paddingHorizontal: RootStyles.GAP,
  },
  errorText: {
    color: 'red',
    marginTop: 6,
    fontSize: 12
  }
})
