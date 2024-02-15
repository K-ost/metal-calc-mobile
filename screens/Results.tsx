import { FlatList, View } from "react-native"
import { useAppSelector } from "../store/hooks"
import ResultItem from "../components/result/ResultItem"
import { RootStyles } from "../styles"
import Paragraph from "../ui/Paragraph"

const ResultsScreen: React.FC = () => {
  const results = useAppSelector(state => state.app.results)

  return (
    <View style={{ flex: 1, padding: RootStyles.GAP }}>
      {results.length ?
        <FlatList
          data={results}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ResultItem key={item.id} item={item} />}
        /> : <Paragraph center>Результатов нет</Paragraph>}
    </View>
  )
}

export default ResultsScreen
