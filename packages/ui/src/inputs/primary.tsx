import React from 'react'
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native'

interface InputProps {
  label: string
  value: string
  onChangeText?: (value: string) => void
}

const emptyFunction = () => {}

export default function PrimaryButton({
  label,
  value,
  onChangeText,
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <TextInput
        onChangeText={onChangeText || emptyFunction}
        value={value}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    // height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    // height: 50,
    fontSize: 22,
    borderColor: 'gray',
  },
  input: {
    backgroundColor: 'lightsalmon',
    // backgroundColor: '#4A494A',
    textAlign: 'center',
    height: 50,
    width: '80%',
  },
})
