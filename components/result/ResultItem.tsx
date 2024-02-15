import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { CalcResultType } from "../../helpers/types"
import { RootStyles } from "../../styles"
import ResultField from "./ResultField"
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { removeResult } from "../../store/appSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { storeData } from "../../helpers/functions"

interface IResultItem {
  item: CalcResultType
}

const ResultItem: React.FC<IResultItem> = ({ item }) => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const { currency, rate, results } = useAppSelector(state => state.app)
  const price = (currency.value === 'usd') ? (item.price / rate).toFixed(2) : item.price

  // removeHandler
  const removeHandler = () => {
    Alert.alert('Удалить результат', 'Вы подтерждаете удаление?', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Удалить', isPreferred: true, style: "destructive", onPress: () => {
        dispatch(removeResult(item.id))
      }},
    ])
  }

  return (
    <View style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <ResultField name="Форма" value={item.shape} />
      <ResultField name="Материал" value={item.material} />
      <ResultField name="Марка" value={item.mark} />
      <ResultField name="Размеры" sizes={item.sizes} currentSize={item.currentSize} />
      <ResultField name="Вес" value={`${item.weight} кг.`} />
      <ResultField name="Цена" value={item.price ? price + ` ${currency.label}` : '---'} last />
      <TouchableOpacity style={styles.remove} onPress={removeHandler}>
        <Ionicons name="close-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

export default ResultItem

// Styles
const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: RootStyles.RADIUS,
    marginBottom: 10,
    paddingHorizontal: RootStyles.GAP,
    paddingVertical: 6,
    position: 'relative',
  },
  remove: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: RootStyles.RADIUS,
    padding: 0,
    width: 34,
    height: 34,
    position: 'absolute',
    right: 5,
    top: 5,
  },
})
