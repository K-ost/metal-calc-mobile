import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { RootStyles } from "../styles"

interface IItem {
  children: React.ReactNode
  name: string
}

const Item: React.FC<IItem> = ({ children, name }) => {
  const { colors } = useTheme()

  return (
    <View
      style={[styles.item, { borderBottomColor: colors.border }]}
    >
      <Text style={styles.name}>{name}</Text>
      <View style={styles.details}>
        {children}
      </View>
    </View>
  )
}

export default Item

// Styles
const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RootStyles.GAP,
    paddingVertical: 4,
    minHeight: 50,
  },
  name: {
    color: '#5a5a5a',
    flex: 1,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
})
