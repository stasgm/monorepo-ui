import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { ConfigScreen } from '../screens/ConfigScreen';
import { ActivationScreen } from '../screens/ActivationScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SplashScreen } from '../screens/SplashScreen';

import { authActions, RootState } from '@lib/common-store';
import { IBaseUrl, IUserCredentials } from '@lib/types';

type AuthStackParamList = {
  Connection: undefined;
  Splash: undefined;
  Login: undefined;
  Config: undefined;
  Activation: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const { device, settings, error, loading, status, settingsForm } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const showSettings = (visible: boolean) => dispatch(authActions.setSettingsForm(visible));
  const saveSettings = (settings: IBaseUrl) => dispatch(authActions.setSettings(settings));
  const checkDevice = () => dispatch(authActions.checkDevice());
  const disconnect = () => dispatch(authActions.disconnect());
  const signIn = (credentials: IUserCredentials) => dispatch(authActions.signIn(credentials))
  const activateDevice = (code: string) => dispatch(authActions.activateDevice(code))

  const serverReq = {
    isError: error,
    isLoading: loading,
    status: status,
  };

  const CongfigWithParams = useCallback(
    () => <ConfigScreen onSetSettings={saveSettings} onShowSettings={showSettings} settings={settings} />,
    [saveSettings, showSettings, settings],
  );

  const SplashWithParams = useCallback(
    () => (
      <SplashScreen request={serverReq} onShowSettings={showSettings} settings={settings} onCheckDevice={checkDevice} />
    ),
    [checkDevice, showSettings, serverReq, settings],
  );

  const SignInWithParams = useCallback(
    () => (
      <SignInScreen request={serverReq} onDisconnect={disconnect} onSignIn={signIn} />
    ),
    [signIn, disconnect, serverReq],
  );

  const ActivateWithParams = useCallback(
    () => (
      <ActivationScreen request={serverReq} onDisconnect={disconnect} onActivate={activateDevice} />
    ),
    [activateDevice, disconnect, serverReq]
  );
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {device? (
        <AuthStack.Screen name="Login" component={SignInWithParams} options={{ animationTypeForReplace: 'push' }}/>
      ) : settingsForm ? (
        <AuthStack.Screen name="Config" component={CongfigWithParams} />
      ) : device === undefined ? (
        <AuthStack.Screen name="Splash" component={SplashWithParams} options={{ animationTypeForReplace: 'pop' }} />
      ) : (
        <AuthStack.Screen name="Activation" component={ActivateWithParams} options={{ animationTypeForReplace: 'push' }} />
      )}
    </AuthStack.Navigator>
  );
};

export { AuthNavigator };
