import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ShapeType } from '../helpers/types'
import { RootStyles } from '../styles'
import { useTheme } from '@react-navigation/native'

interface IShape {
  item: ShapeType
  navigation: any
}

const Shape: React.FC<IShape> = ({ item, navigation }) => {
  const { dark, colors } = useTheme()

  return (
    <View>
      <TouchableOpacity
        style={[styles.item, { backgroundColor: dark ? '#1f1f1f' : RootStyles.COLOR_WHITE, borderColor: colors.border }]}
        onPress={() => navigation.navigate('Form', { id: item.id, title: item.title, list: item.list, image: item.image })}
      >
        <Image source={item.img} style={{ width: 32, height: 32, marginEnd: RootStyles.GAP }} resizeMode="contain" />
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500' }}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Shape

// Styles
const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: RootStyles.RADIUS,
    marginHorizontal: RootStyles.GAP,
    paddingHorizontal: RootStyles.GAP,
    paddingVertical: RootStyles.GAP,
    marginBottom: 6,
    flexDirection: 'row',
  },
})
