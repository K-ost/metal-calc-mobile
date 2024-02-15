import AsyncStorage from "@react-native-async-storage/async-storage"
import { measuresList } from "./helpers"
import { CalcResultType, MeasureTitleType, MeasureType, MeasureValType } from "./types"

// getMeasure
export const getMeasure = (id: number): MeasureType => {
  return measuresList.find(el => el.id === id)!
}

// getSizeName
export const getSizeName = (name: MeasureValType): MeasureTitleType | undefined => {
  if (name === 'diameter') return 'Диаметр'
  if (name === 'height') return 'Высота'
  if (name === 'length') return 'Длина'
  if (name === 'number') return 'Количество'
  if (name === 'width') return 'Ширина'
  if (name === 'wall') return 'Стенка'
  if (name === 'jumper') return 'Перемычка'
  if (name === 'shelf') return 'Полка'
  if (name === 'thick') return 'Толщина'
  if (name === 'outDiameter') return 'Внеш. диаметр'
  return undefined
}

// transformComma
export const transformComma = (data: any) => {
  const output = Object.entries(data).map((el: any) => {
    if (el[1].includes(',')) {
      el[1] = el[1].replace(',', '.')
    }
    el[1] = Number(el[1])
    return el
  })
  return Object.fromEntries(output)
}

// Saving to storage
export const storeData = async (key: string, value: string | boolean) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}
