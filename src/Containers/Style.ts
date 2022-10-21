import { Colors } from '@/Theme/Variables'
import { heightPixel, normalize, widthPixel } from '@/utils'
import { StyleSheet } from 'react-native'

export const Style = StyleSheet.create({
  container: {
    backgroundColor: Colors.light_blue,
  },
  itemSeperator: {
    borderWidth: 1,
    width: '100%',
    borderColor: Colors.border,
  },
  iconView: {
    height: heightPixel(20),
    width: widthPixel(20),
  },
  dateWrapper: {
    borderRadius: normalize(10),
    backgroundColor: Colors.white,
  },
})
