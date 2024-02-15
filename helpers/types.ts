export type ThemeType = 'light' | 'dark'

export type ShapeType = {
  id: number
  title: string
  value: string
  list: number[]
  img: any
  image: any
}

export type SelectItemType = {
  label: string  
  value: string
  dataValue?: string
  list?: SelectItemType[]
}

export type CalcResultType = {
  id: string
  material: string
  mark: string
  sizes: any
  weight: number
  price: number
  shape: string
  currentSize: string
}

export type PreCalcType = {
  title: string
  data: any
  mark: SelectItemType
  material: string
}

export type MeasureTitleType = 'Высота' | 'Ширина' | 'Длина' | 'Стенка' | 'Толщина' | 'Количество' | 'Внеш. диаметр' | 'Диаметр' | 'Перемычка' | 'Полка'
export type MeasureValType = 'height' | 'width' | 'length' | 'wall' | 'thick' | 'number' | 'outDiameter' | 'diameter' | 'jumper' | 'shelf'

export type MeasureType = {
  id: number
  title: MeasureTitleType
  value: MeasureValType
}
