import { StyleSheet, Text } from "react-native"
import { useTheme } from "@react-navigation/native"

interface ILabel {
  title: string
}

const Label: React.FC<ILabel> = ({ title }) => {
  const { colors } = useTheme()
  return (
    <Text style={[styles.label, { color: colors.text }]}>{title}</Text>
  )
}

export default Label

const styles = StyleSheet.create({
  label: {
    fontWeight: '500',
    marginBottom: 6,
    fontSize: 13,
  },
})