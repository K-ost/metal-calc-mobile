import { FlatList, View } from "react-native"
import { ShapesList } from "../helpers/helpers"
import Shape from "../components/Shape"
import { RootStyles } from "../styles"

const HomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, paddingTop: RootStyles.GAP }}>
      <FlatList data={ShapesList} showsVerticalScrollIndicator={false} renderItem={({ item }) => (
        <Shape key={item.id} item={item} navigation={navigation} />
      )} />
    </View>
  )
}

export default HomeScreen
