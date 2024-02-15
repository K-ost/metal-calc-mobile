import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { CalcResultType, PreCalcType, SelectItemType, ThemeType } from '../helpers/types'
import { storeData, transformComma } from '../helpers/functions'

// Define a type for the slice state
interface AppState {
  material: SelectItemType
  mark: SelectItemType
  size: SelectItemType
  currency: SelectItemType
  rate: number
  results: CalcResultType[]
  theme: ThemeType
}

// Define the initial state using that type
const initialState: AppState = {
  material: { label: 'Сталь', value: '1' },
  mark: { label: 'Марка', value: '1', dataValue: '7850' },
  size: { label: 'м.', value: 'm' },
  currency: { label: 'RUR', value: 'rur' },
  rate: 1,
  results: [],
  theme: 'light'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    // setMaterial
    setMaterial: (state, action: PayloadAction<SelectItemType>) => {
      state.material = action.payload
    },
    
    // setMark
    setMark: (state, action: PayloadAction<SelectItemType>) => {
      state.mark = action.payload
    },

    // setSize
    setSize: (state, action: PayloadAction<SelectItemType>) => {
      state.size = action.payload
    },
    
    // setCurrency
    setCurrency: (state, action: PayloadAction<SelectItemType>) => {
      state.currency = action.payload
      if (action.payload.value === 'rur') {
        state.rate = 1
      }
      if (action.payload.value === 'usd') {
        state.rate = 90.5
      }
    },

    // setAllResults
    setAllResults: (state, action: PayloadAction<CalcResultType[]>) => {
      state.results = action.payload
    },

    // setResult
    setResult: (state, action: PayloadAction<PreCalcType>) => {
      const { data, title, mark, material } = action.payload
      const markNum = Number(mark.dataValue)
      let weight: number = 0
      const datas: any = transformComma(data)

      // Corner / ro * S * (A + B — S) * L
      if (title === 'Уголок') {
        const { height, length, wall, width } = datas
        weight = markNum * wall * (height + width - wall) * length
      }
     
      // sheet
      if (title === 'Лист') {
        const { thick, width, length, number } = datas
        weight = thick * width * length * number * markNum
      }

      // Pipe round / Pi * Ro * S * (D - S) * L
      if (title === 'Труба') {
        const { length, outDiameter, thick } = datas
        weight = Math.PI * markNum * thick * ( outDiameter - thick ) * length
      }

      // circle
      if (title === 'Круг') {
        weight = Math.PI * Math.pow( (datas.diameter / 2), 2) * datas.length * markNum
      }

      // Pipe square
      if (title === 'Труба кв.') {
        const { height, length, wall, width } = datas
        weight = ( (height + width) * 2 ) * length * wall * markNum
      }

      // Square
      if (title === 'Квадрат') {
        const { width, length } = datas
        weight = Math.pow(width, 2) * length * markNum
      }

      // Shwell / М = ( 2 x B + Н — 4 х S ) * L х S х 7.9
      if (title === 'Швеллер') {
        const { height, width, length, wall } = datas
        weight = ( 2 * height + width - 4 * wall ) * length * wall * markNum
      }

      // Stripe
      if (title === 'Полоса' ) {
        const { thick, width, length } = datas
        weight = thick * width * length * markNum
      }

      // Rail
      if (title === 'Балка') {
        const { height, jumper, length, shelf, width } = datas
        weight = markNum * (2 * width * jumper + (height - 2 * jumper) * shelf) * length
      }

      // Corner6
      if (title === 'Шестигранник') {
        const cbrt = 0.87
        const { diameter, length } = datas
        weight = cbrt * Math.pow(diameter, 2) * length * markNum
      }


      // Weight counting
      const coefficient = (state.size.value) === 'mm' ? 1000000000 : (state.size.value === 'sm') ? 100000000 : 1000000
      weight = Number((weight / coefficient).toFixed(2))
      let totalPrice: number = weight * datas.price * state.rate
      let sizes = Object.entries(datas)
      sizes.pop()      

      // Output
      const output: CalcResultType = {
        id: Date.now().toString(),
        material,
        mark: mark.label,
        sizes,
        weight,
        shape: title,
        price: Number(totalPrice.toFixed(2)),
        currentSize: state.size.label
      }

      // Putting to state
      state.results = [output, ...state.results]
    },

    // removeResult / removeAllResults
    removeResult: (state, action: PayloadAction<string>) => {
      state.results = state.results.filter(el => el.id !== action.payload)
      storeData('results', JSON.stringify(state.results))
    },
    removeAllResults: (state) => {
      state.results = []
      storeData('results', JSON.stringify(state.results))
    },

    // setTheme
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload
    },
  },
})

export const { setMaterial, setMark, setSize, setAllResults, setResult, removeResult, removeAllResults, setTheme, setCurrency } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.app.results

export default appSlice.reducer