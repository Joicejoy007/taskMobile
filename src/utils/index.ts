import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320

const widthBaseScale = SCREEN_WIDTH / 375
const heightBaseScale = SCREEN_HEIGHT / 812

export function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

//for width  pixel
const widthPixel = size => {
  return normalize(size, 'width')
}
//for height  pixel
const heightPixel = size => {
  return normalize(size, 'height')
}
//for font  pixel
const fontPixel = size => {
  return heightPixel(size)
}
//for Margin and Padding vertical pixel
const pixelSizeVertical = size => {
  return heightPixel(size)
}
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = size => {
  return widthPixel(size)
}

export {
  heightPixel,
  widthPixel,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  pixelSizeHorizontal,
  pixelSizeVertical,
  fontPixel,
}
