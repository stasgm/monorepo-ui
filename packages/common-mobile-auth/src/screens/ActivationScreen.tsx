import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, ActivityIndicator, IconButton, TextInput, useTheme } from 'react-native-paper';
import { globalStyles } from '@lib/common-ui';
import { IDataFetch } from '@lib/types';

type Props = {
  request: IDataFetch;
  onDisconnect: () => {};
  onActivate: (code: string) => {};
}

const ActivationScreen = (props: Props) => {
  const { colors } = useTheme();
  const { request, onDisconnect, onActivate } = props;

  const [activationCode, setActivationCode] = useState('');
  console.log('Activation')

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const isFocused = useIsFocused();

  const sendActivationCode = () => {
    Keyboard.dismiss();
    onActivate(activationCode);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={[globalStyles.container, isKeyboardVisible && styles.contentWidthKbd]}>
          <View style={globalStyles.container}>
            <Text>Активация устройства</Text>
            <View
              style={{
                ...styles.statusBox,
                backgroundColor: colors.background,
              }}
            >
              {request.isError && <Text style={styles.errorText}>Ошибка: {request.status}</Text>}
              {request.isLoading && <ActivityIndicator size="large" color="#70667D" />}
            </View>
            <TextInput
              autoFocus={isFocused}
              placeholder="Введите код"
              keyboardType="number-pad"
              returnKeyType="done"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              value={activationCode}
              onChangeText={setActivationCode}
            />
            <Button
              mode="contained"
              disabled={request.isLoading}
              icon={'login'}
              onPress={sendActivationCode}
              style={globalStyles.rectangularButton}
            >
              Отправить
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View style={globalStyles.bottomButtons}>
        <IconButton
          icon="server"
          size={30}
          onPress={onDisconnect}
          style={{
            ...globalStyles.circularButton,
            backgroundColor: colors.primary,
            borderColor: colors.primary,
          }}
          color={colors.background}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: '100%',
  },
  codeText: {
    borderColor: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    height: 30,
    marginTop: 15,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWidthKbd: {
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  errorText: {
    color: '#cc5933',
    fontSize: 18,
  },
  statusBox: {
    alignItems: 'center',
    height: 70,
    justifyContent: 'center',
  },
});

export { ActivationScreen };
