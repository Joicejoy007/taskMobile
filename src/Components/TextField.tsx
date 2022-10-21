import { Colors } from '@/Theme/Variables'
import React from 'react'
import { TextInput } from 'react-native'
import { Style } from './Style'

export default function TextField(
  props: React.ComponentProps<typeof TextInput>,
) {
  return (
    <TextInput
      placeholderTextColor={Colors.text}
      style={Style.textInputContainer}
      {...props}
    />
  )
}
