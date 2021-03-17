import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PrimaryButton } from '@lib/ui'
import { PrimaryInput } from '@lib/ui'
import { BottomSheet, RadioGroup } from '@lib/components';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  const [name, setName] = useState('Stas');
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedOption, setSelectedOption] = useState<{id: number, value: string} | null>(null);

  const handlePresent = () => {
    setSelectedOption(selectedOption ??options[0]);
    bottomSheetRef.current?.present();
  };

  const handleApply = () => bottomSheetRef.current?.dismiss();

  const handleDismiss = () => bottomSheetRef.current?.dismiss();

  const options = [
    { id: 0, value: 'Желтый' },
    { id: 1, value: 'Синий' },
    { id: 2, value: 'Красный' },
    { id: 3, value: 'Зелёный' },
  ];

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <PrimaryButton title="Hello, world!" />
      <PrimaryInput value={name} label="Name" onChangeText={setName} />
      <PrimaryButton title={selectedOption?.value || 'Цвет не выбран'} onPress={handlePresent} />      
      <BottomSheetModalProvider>
        <BottomSheet
          sheetRef={bottomSheetRef}
          title={'Список цветов'}
          handelDismiss={handleDismiss}
          handelApply={handleApply}
        >
          <RadioGroup options={options} onChange={setSelectedOption} activeButtonId={selectedOption?.id ?? 0} />
        </BottomSheet>
      </BottomSheetModalProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
