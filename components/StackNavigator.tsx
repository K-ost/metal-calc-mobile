import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation, useTheme } from '@react-navigation/native'
import HomeScreen from '../screens/Home'
import FormScreen from '../screens/Form'
import InfoScreen from '../screens/Info'
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons' 
import ResultsScreen from '../screens/Results'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import SettingsScreen from '../screens/Settings'
import { removeAllResults } from '../store/appSlice'
import { RootStyles } from '../styles'


const RootStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


// TabNavigator
export function TabNavigator() {
  const results = useAppSelector(state => state.app.results).length
  const { colors } = useTheme()
  const dispatch = useAppDispatch()

  // removeAllResultsHandler
  const removeAllResultsHandler = () => {
    Alert.alert('Удалить результаты', 'Все результаты будут удалены', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Удалить', isPreferred: true, style: "destructive", onPress: () => dispatch(removeAllResults()) },
    ])
  }

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: '#717171',
      tabBarLabel: (props) => {
        return <Text style={{ fontSize: 12, color: props.color }}>{props.children}</Text>
      },
    }}>
      <Tab.Screen name="Калькулятор" component={StackNavigator} options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="calculator-outline" size={20} color={color} />
        )
      }} />
      <Tab.Screen name="Результаты" component={ResultsScreen} options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="list-sharp" size={22} color={color} />
        ),
        tabBarBadge: results ? results : undefined,
        headerRight: () => (
          results ? <TouchableOpacity onPress={removeAllResultsHandler} style={{ marginRight: RootStyles.GAP }}>
            <Text style={{ color: colors.notification, fontWeight: '500', fontSize: 14 }}>Удалить все</Text>
          </TouchableOpacity> : null
        )
      }} />
      <Tab.Screen name="Настройки" component={SettingsScreen} options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="settings" size={20} color={color} />
        ),
      }} />
    </Tab.Navigator>
  )
}


// StackNavigator
export function StackNavigator() {
  const navigation: any = useNavigation()
  const { colors } = useTheme()

  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('Инструкция')}>
            <Ionicons name="information-circle-outline" size={24} color={colors.text} />
          </Pressable>
        ),
      }}>
        <RootStack.Screen name="Калькулятор металлов" component={HomeScreen} />
        <RootStack.Screen name="Form" component={FormScreen} options={{
          headerBackTitle: 'Назад',
          headerShadowVisible: true,
        }} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="Инструкция" component={InfoScreen} options={{
          headerRight: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="close-outline" size={24} color={colors.primary} />
            </Pressable>
          )
        }} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}
