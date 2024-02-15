import { useEffect, useState } from "react"
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, Vibration } from "react-native"
import FormControl from "../ui/FormControl"
import { RootStyles } from "../styles"
import FooterResults from "../components/FooterResults"
import { useForm } from "react-hook-form"
import Btn from "../ui/Btn"
import { selectList } from "../helpers/select"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { setMark, setMaterial, setResult } from "../store/appSlice"
import Select from "../ui/Select"
import { SelectItemType } from "../helpers/types"
import { getMeasure, storeData } from "../helpers/functions"
import AsyncStorage from "@react-native-async-storage/async-storage"

const FormScreen: React.FC = ({ navigation, route }: any) => {
  const { image, list, title } = route.params
  const dispatch = useAppDispatch()
  const currentMaterial = useAppSelector(state => state.app.material)
  const currentMark = useAppSelector(state => state.app.mark)
  const currentSize = useAppSelector(state => state.app.size)
  const currency = useAppSelector(state => state.app.currency)
  const [marks, setMarks] = useState<SelectItemType[]>([])
  const results = useAppSelector(state => state.app.results)

  // Form validate
  const { handleSubmit, control, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const currentMarks = selectList.find(el => el.label === currentMaterial.label)?.list
    setMarks(currentMarks!)
    dispatch(setMark(currentMarks![0]))
  }, [currentMaterial])

  useEffect(() => {
    navigation.setOptions({ title })
  }, [])

  // Vibration while errors
  useEffect(() => {
    if (!!Object.keys(errors).length) {
      Vibration.vibrate(400)
    }
  }, [errors])

  // Saving to storage
  useEffect(() => {
    storeData('results', JSON.stringify(results))
  }, [results])


  // OnSubmit
  const onSubmit = (data: any): void => {
    dispatch(setResult({ data, title, mark: currentMark, material: currentMaterial.label }))
    //reset()
  }


  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, padding: RootStyles.GAP }} behavior={Platform.OS && 'padding'}>
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <View style={styles.imgBox}>
            <View style={styles.img}>
              <Image source={image} style={{ width: 150, height: 150 }} resizeMode="contain" />
            </View>
            <View style={styles.selects}>
              <Select label="Материал" value={currentMaterial.label} list={selectList} handler={(val) => dispatch(setMaterial(val))} />
              <Select label="Марка" value={currentMark.label} list={marks} handler={(val) => dispatch(setMark(val))} />
            </View>
          </View>
          
          {list.map((el: number) => {
            const measure = getMeasure(el)
            const label = `${measure.title}, ${measure.value === 'length' ? currentSize.label : (measure.value === 'number') ? 'шт.' : 'мм.'}`
            return <FormControl key={el} label={label} control={control} name={measure.value} required />
          })}
          
          <FormControl label={`Цена за кг, ${currency.label}`} control={control} name="price" />
        </ScrollView>
      </KeyboardAvoidingView>

      <FooterResults>
        <Btn handler={handleSubmit(onSubmit)} title="Посчитать" color="primary" />
      </FooterResults>
    </View>
  )
}

export default FormScreen

// Styles
const styles = StyleSheet.create({
  imgBox: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    maxWidth: '44%',
    marginEnd: RootStyles.GAP,
  },
  selects: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  box: {
    flex: 1,
    paddingHorizontal: 5,
  },
})
