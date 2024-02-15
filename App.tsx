import { Provider } from "react-redux"
import { store } from "./store/store"
import ThemeContainer from "./components/ThemeContainer"
import { StatusBar } from "react-native"

export default function App() {
  return <Provider store={store}>
    <StatusBar />
    <ThemeContainer />
  </Provider>
}
