import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { RootStyles } from '../styles'

interface IBtn {
  color?: "primary" | "secondary"
  handler: () => void
  title: string
  size?: 'small' | 'medium' | 'large'
}

const Btn: React.FC<IBtn> = ({ color = 'primary', handler, title, size = 'medium' }) => {
  const { colors } = useTheme()
  const bg = (color === 'primary') ? colors.primary : RootStyles.COLOR_LIGHT

  return (
    <TouchableOpacity style={[
        btnStyles.btn, {
          minHeight: size === 'large' ? 50 : size === 'small' ? 30 : 40,
          backgroundColor: bg,
        }
    ]} onPress={handler}>
      <Text style={btnStyles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}

// Styles
const btnStyles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderRadius: RootStyles.RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
})

export default Btn
