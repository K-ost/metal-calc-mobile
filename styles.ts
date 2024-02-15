import { StyleSheet } from "react-native"

// Global styles
export const RootStyles = {
  GAP: 16,
  PARAGRAPH: 24,
  RADIUS: 8,
  COLOR_BORDER: '#d1d1d1',
  COLOR_DANGER: '#dc3545',
  COLOR_WARNING: '#fd7e14',
  COLOR_LIGHT: '#e1e1e1',
  COLOR_WHITE: '#fff',
  COLOR_SUCCESS: '#198754',
  COLOR_PRIMARY: '#0d6efd',
  COLOR_GRAY: '#717171',
  COLOR_DARK: '#151515',
  COLOR_BLACK: '#000',
}

export const GlobalStyles = StyleSheet.create({
  container: {
    paddingVertical: RootStyles.GAP,
    paddingHorizontal: RootStyles.GAP,
  },
  paragraph: {
    marginBottom: RootStyles.PARAGRAPH,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: RootStyles.GAP,
  },
})
