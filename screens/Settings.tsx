import { LogBox, Switch, Text, View } from 'react-native'
import { GlobalStyles, RootStyles } from '../styles'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCurrency, setSize, setTheme } from '../store/appSlice'
import { useTheme } from '@react-navigation/native'
import Item from '../ui/Item'
import Select from '../ui/Select'
import { currencyList, sizesList } from '../helpers/helpers'
import { useEffect, useState } from 'react'
import Btn from '../ui/Btn'
import { storeData } from '../helpers/functions'

const SettingsScreen = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.app.theme)
  const size = useAppSelector(state => state.app.size)
  const currency = useAppSelector(state => state.app.currency)
  const { colors } = useTheme()

  // PRO
  const [proAccount, setProAccount] = useState<boolean>(false)
  // PRO

  // switchTheme
  const switchTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  // Currency changing
  useEffect(() => {
    if (currency.value === 'usd') {
      console.log('changed to usd')
    }
  }, [currency])

  useEffect(() => {
    storeData('theme', theme)
  }, [theme])

  return (
    <View>
      
      <Item name="Цвет темы">
        <Switch
          trackColor={{false: RootStyles.COLOR_LIGHT, true: colors.primary}}
          thumbColor={theme ? RootStyles.COLOR_WHITE : RootStyles.COLOR_WHITE}
          ios_backgroundColor={RootStyles.COLOR_LIGHT}
          onValueChange={switchTheme}
          value={theme === "dark" ? true : false}
        />
      </Item>

      <Item name="Размер длины">
        <Select handler={(val) => dispatch(setSize(val))} list={sizesList} value={size.label} style={{ marginBottom: 0, flex: 1 }} size="small" />
      </Item>

      {proAccount &&
      <Item name="Валюта">
        <Select handler={(val) => dispatch(setCurrency(val))} list={currencyList} value={currency.label} style={{ marginBottom: 0, flex: 1 }} size="small" />
      </Item>}

      <Item name="Версия">
        <Text style={{ color: colors.text }}>1.4</Text>
      </Item>

      {/* <View style={GlobalStyles.item}>
        <Btn handler={() => setProAccount(!proAccount)} title="Купить PRO" color="primary" size="large" />
      </View> */}

    </View>
  )
}

export default SettingsScreen
