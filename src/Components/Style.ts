import { Colors } from '@/Theme/Variables'
import {
  heightPixel,
  normalize,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '@/utils'
import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    height: heightPixel(50),
    backgroundColor: Colors.white,
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(10),
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: normalize(5),
    color: Colors.text,
  },
})
