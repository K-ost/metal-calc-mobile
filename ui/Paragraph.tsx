import { Text } from "react-native"
import { useTheme } from "@react-navigation/native"
import { RootStyles } from "../styles"

interface IParagraph {
  children: React.ReactNode
  classes?: any
  nomargin?: boolean
  center?: boolean
}

const Paragraph: React.FC<IParagraph> = ({ children, center, classes, nomargin }) => {
  const { colors } = useTheme()

  return (
    <Text
      style={{
        marginBottom: nomargin ? 0 : RootStyles.PARAGRAPH,
        color: colors.text,
        textAlign: center ? 'center' : 'left',
        ...classes
      }}
    >{children}</Text>
  )
}

export default Paragraph
