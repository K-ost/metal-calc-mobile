import { useState } from 'react'
import { useTheme } from "@react-navigation/native"
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SelectItemType } from '../helpers/types'
import { RootStyles } from '../styles'
import Label from './Label'

interface ISelect {
  handler: (label: SelectItemType) => void
  label?: string
  list: SelectItemType[]
  value: string
  style?: any
  size?: 'small' | 'default'
}

const Select: React.FC<ISelect> = ({ handler, label, list, value, style, size = 'default' }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { dark, colors } = useTheme()
  
  // optionHandler
  const optionHandler = (item: SelectItemType) => {
    setModalVisible(false)
    handler(item)
  }

  return (
    <>
      <View style={[styles.item, { ...style }]}>
        {label && <Label title={label} />}
        <TouchableOpacity
          style={[styles.select, {
            backgroundColor: dark ? '#212121' : RootStyles.COLOR_WHITE,
            borderColor: colors.border,
            height: size === 'small' ? 40 : 50,
          }]}
          onPress={() => setModalVisible(true)}
        >
          <Text numberOfLines={1} style={[styles.value, { color: colors.text }]}>{value}</Text>
          <Ionicons name="chevron-down" size={16} color="black" style={[styles.icon, { color: colors.text }]} />
        </TouchableOpacity>
      </View>
      
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalView, { backgroundColor: colors.card }]}>
            <View style={[styles.optionHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.optionHeaderText, { color: colors.text }]}>Выбрать {label}</Text>
            </View>
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <View style={[styles.option, { borderBottomColor: colors.border }, item.label === value && { backgroundColor: colors.background }]}>
                  <TouchableOpacity
                    style={styles.optionInner}
                    onPress={() => optionHandler(item)}
                  >
                    <Text style={item.label === value ? { color: colors.primary, fontWeight: '700' } : { color: colors.text }}>
                      {item.label}
                    </Text>
                    {(item.label === value) && <Ionicons name="checkmark" size={20} color={colors.primary} style={styles.iconOption} />}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

export default Select

// Styles
const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
  },
  select: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: RootStyles.GAP,
    borderWidth: 1,
    borderRadius: RootStyles.RADIUS,
    color: 'black',
    paddingRight: 40,
    position: 'relative',
  },
  value: {
    fontSize: 14,
    lineHeight: 20,
  },
  icon: {
    marginTop: -8,
    position: 'absolute',
    right: 10,
    top: '50%',
  },
  iconOption: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    shadowColor: '#000',
    minHeight: '30%',
    maxHeight: '70%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    paddingBottom: 30,
  },
  optionHeader: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: RootStyles.GAP,
    paddingVertical: 10,
    alignItems: 'center'
  },
  optionHeaderText: {
    fontWeight: '600',
  },
  option: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  optionInner: {
    padding: RootStyles.GAP,
    position: 'relative',
  },
})
