import { MeasureType, SelectItemType, ShapeType } from "./types"

export const measuresList: MeasureType[] = [
  { id: 1, title: 'Высота', value: 'height' },
  { id: 2, title: 'Ширина', value: 'width' },
  { id: 3, title: 'Длина', value: 'length' },
  { id: 4, title: 'Стенка', value: 'wall' },
  { id: 5, title: 'Толщина', value: 'thick' },
  { id: 6, title: 'Количество', value: 'number' },
  { id: 7, title: 'Внеш. диаметр', value: 'outDiameter' },
  { id: 8, title: 'Диаметр', value: 'diameter' },
  { id: 9, title: 'Перемычка', value: 'jumper' },
  { id: 10, title: 'Полка', value: 'shelf' },
]

export const sizesList: SelectItemType[] = [
  { label: 'мм.', value: 'mm' },
  { label: 'см.', value: 'sm' },
  { label: 'м.', value: 'm' },
]

export const currencyList: SelectItemType[] = [
  { label: 'руб.', value: 'rur' },
  { label: 'USD', value: 'usd' }
]

export const ShapesList: ShapeType[] = [
  {
    id: 1,
    title: "Уголок",
    value: "corner",
    img: require('../assets/images/corner.webp'),
    image: require('../assets/images/corner-image.webp'),
    list: [ 1, 2, 3, 4 ]
  },
  {
    id: 2,
    title: "Лист",
    value: "sheet",
    img: require('../assets/images/sheet.webp'),
    image: require('../assets/images/sheet-image.webp'),
    list: [ 5, 2, 3, 6 ]
  },
  {
    id: 3,
    title: "Труба",
    value: "pipe",
    img: require('../assets/images/pipe.webp'),
    image: require('../assets/images/pipe-image.webp'),
    list: [ 7, 5, 3 ]
  },
  {
    id: 4,
    title: "Круг",
    value: "circle",
    img: require('../assets/images/circle.webp'),
    image: require('../assets/images/circle-image.webp'),
    list: [ 8, 3 ]
  },
  {
    id: 5,
    title: "Труба кв.",
    value: "pipe-square",
    img: require('../assets/images/pipesquare.webp'),
    image: require('../assets/images/pipesquare-image.webp'),
    list: [ 1, 2, 3, 4 ]
  },
  {
    id: 6,
    title: "Квадрат",
    value: "square",
    img: require('../assets/images/square.webp'),
    image: require('../assets/images/square-image.webp'),
    list: [ 2, 3 ]
  },
  {
    id: 7,
    title: "Швеллер",
    value: "shwell",
    img: require('../assets/images/shwell.webp'),
    image: require('../assets/images/shwell-image.webp'),
    list: [ 1, 2, 3, 4 ]
  },
  {
    id: 8,
    title: "Полоса",
    value: "ribbon",
    img: require('../assets/images/ribbon.webp'),
    image: require('../assets/images/ribbon-image.webp'),
    list: [ 5, 2, 3 ]
  },
  {
    id: 9,
    title: "Балка",
    value: "rail",
    img: require('../assets/images/rail.webp'),
    image: require('../assets/images/rail-image.webp'),
    list: [ 1, 2, 9, 10, 3 ]
  },
  {
    id: 10,
    title: "Шестигранник",
    value: "corner6",
    img: require('../assets/images/corner6.webp'),
    image: require('../assets/images/corner6-image.webp'),
    list: [ 8, 3 ]
   }
]

