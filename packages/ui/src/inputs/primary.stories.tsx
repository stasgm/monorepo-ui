import React, { useState } from 'react'
import PrimaryInput from './primary'

export default {
  title: 'Input',
}

export const TestInput = () => {
  const [name, setName] = useState('Stas')

  return <PrimaryInput value={name} label="Name" onChangeText={setName} />
}
