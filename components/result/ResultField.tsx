import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { RootStyles } from "../../styles"
import { MeasureValType } from "../../helpers/types"
import { getSizeName } from "../../helpers/functions"
import Paragraph from "../../ui/Paragraph"
import { useAppSelector } from "../../store/hooks"

interface IResultField {
  name: string
  value?: string
  last?: boolean
  sizes?: [MeasureValType, string][]
  currentSize?: string
}

const ResultField: React.FC<IResultField> = ({ last, name, sizes, value, currentSize }) => {
  const { colors } = useTheme()

  return (
    <View style={[
      styles.line,
      { borderBottomColor: colors.border },
      last ? { borderBottomWidth: 0, borderBlockColor: 'transparent' } : {}
    ]}>
      <Text style={styles.name}>{name}</Text>
      {!!value && <Paragraph nomargin classes={styles.value}>{value}</Paragraph>}
      {!!sizes && <View style={styles.value}>
        {sizes.map((el, index) => {
          const name = getSizeName(el[0])
          return <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Paragraph nomargin classes={{ fontWeight: '500' }}>{el[1]} {el[0] === 'length' ? currentSize : 'мм.'}</Paragraph>
            <Paragraph nomargin classes={{ fontWeight: '300', fontSize: 12 }}> ({name})</Paragraph>
          </View>
        })}
      </View>}
    </View>
  )
}

export default ResultField

// Styles
const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    position: 'relative',
    paddingVertical: 6,
  },
  name: {
    color: '#7a7a7a',
    width: '40%',
  },
  value: {
    fontWeight: '500',
    width: '60%',
  },
})
