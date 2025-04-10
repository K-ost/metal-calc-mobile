import { Text, View } from "react-native"
import { GlobalStyles } from "../styles"
import Paragraph from "../ui/Paragraph"

const InfoScreen: React.FC = () => {
  return (
    <View style={GlobalStyles.container}>
      <Paragraph>Металлический онлайн-калькулятор веса металла «УралМетСтрой» позволяет быстро и точно рассчитать вес металлопроката конкретных марок и конфигураций.</Paragraph>
      <Paragraph>В нашем металлокалькуляторе удобно рассчитать вес стали, чугуна, алюминия, латуни, бронзы, меди, олова, магния, титана, свинца, никеля, цинка, а также их сплавов.</Paragraph>
      <Paragraph>В перечне ассортимента проката, который считает калькулятор металлов присутствует труба, уголок, лист, лента, круг, проволока, швеллер, балка, шестигранник, профильная труба и, с условной точностью, арматура.</Paragraph>
      <Paragraph>Калькулятор рассчитывает вес металлопроката по его удельному весу за несколько шагов. Введите размеры изделий и нажмите «Посчитать» — вы получите вес металлопроката в кг.</Paragraph>
      <Paragraph>Чтобы посчитать вес — введите длину и размеры.</Paragraph>
    </View>
  )
}

export default InfoScreen
