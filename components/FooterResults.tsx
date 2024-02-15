import { Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useAppSelector } from '../store/hooks'
import { RootStyles } from '../styles'

interface IFooterResults {
  children: React.ReactNode
}

const FooterResults: React.FC<IFooterResults> = ({ children }) => {
  const lastResult = useAppSelector(state => state.app.results)
  const result = !!lastResult[0] ? lastResult[0].weight : '---'
  const { colors } = useTheme()

  return (
    <View style={{
      alignItems: 'center',
      borderTopColor: colors.border,
      borderTopWidth: 0.5,
      borderStyle: 'solid',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
      paddingEnd: 4,
      paddingStart: RootStyles.GAP,
    }}>
      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}>{result}, кг</Text>
      {children}
    </View>
  )
}

export default FooterResults
