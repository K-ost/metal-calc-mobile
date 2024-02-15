import { useAppDispatch, useAppSelector } from "../store/hooks"
import { NavigationContainer } from "@react-navigation/native"
import { TabNavigator } from "./StackNavigator"
import { RootStyles } from "../styles"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from "react"
import { CalcResultType } from "../helpers/types"
import { setAllResults, setTheme } from "../store/appSlice"

// Themes
const LightTheme = {
  dark: false,
  colors: {
    primary: RootStyles.COLOR_PRIMARY,
    background: '#f5f5f5',
    card: RootStyles.COLOR_WHITE,
    text: RootStyles.COLOR_BLACK,
    border: RootStyles.COLOR_LIGHT,
    notification: RootStyles.COLOR_DANGER,
  },
}
const DarkTheme = {
  dark: true,
  colors: {
    primary: RootStyles.COLOR_WARNING,
    background: RootStyles.COLOR_DARK,
    card: "#1e1e1e",
    text: '#ededed',
    border: '#353535',
    notification: RootStyles.COLOR_DANGER,
  },
}

const Providers: React.FC = () => {
  const theme = useAppSelector(state => state.app.theme)
  const dispatch = useAppDispatch()

  // Get data from storage
  useEffect(() => {
    const getData = async () => {
      try {
        const resultsSt = await AsyncStorage.getItem('results')
        const themeSt = await AsyncStorage.getItem('theme')
        const results = await JSON.parse(resultsSt!)
        const theme = await JSON.parse(themeSt!)
        
        if (resultsSt !== null) dispatch(setAllResults( JSON.parse(results!) ))
        if (theme === 'light') dispatch(setTheme('light'))
        if (theme === 'dark') dispatch(setTheme('dark'))
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [theme])

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <TabNavigator />
    </NavigationContainer>
  )
}

export default Providers
