import { createStackNavigator } from '@react-navigation/stack'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authActions, RootState } from '@lib/common-store'
import { IBaseUrl, ICompany, IUserCredentials } from '@lib/types'

import {
  CompaniesScreen,
  SplashScreen,
  SignInScreen,
  ConfigScreen,
  ActivationScreen,
} from '../screens'

type AuthStackParamList = {
  Connection: undefined
  Splash: undefined
  Login: undefined
  Config: undefined
  Activation: undefined
  Company: undefined
}

const AuthStack = createStackNavigator<AuthStackParamList>()

const AuthNavigator: React.FC = () => {
  const { device, settings, error, loading, status, user } = useSelector(
    (state: RootState) => state.auth,
  )
  const dispatch = useDispatch()

  const saveSettings = useCallback(
    (settings: IBaseUrl) => dispatch(authActions.setSettings(settings)),
    [authActions.setSettings],
  )
  const checkDevice = useCallback(() => dispatch(authActions.checkDevice()), [
    authActions.checkDevice,
  ])
  const activateDevice = useCallback(
    (code: string) => dispatch(authActions.activateDevice(code)),
    [authActions.activateDevice],
  )

  const disconnect = useCallback(() => dispatch(authActions.disconnect()), [
    authActions.disconnect,
  ])

  const signIn = useCallback((credentials: IUserCredentials) =>
      dispatch(authActions.signIn(credentials)),
    [authActions.signIn],
  )

  const logout = () =>
    useCallback(() => dispatch(authActions.logout()), [authActions.logout])

  const setCompany = useCallback(
    (company: ICompany) => dispatch(authActions.setCompany(company)),
    [authActions.setCompany],
  )


  const CongfigWithParams = useCallback(
    () => <ConfigScreen onSetSettings={saveSettings} settings={settings} />,
    [saveSettings, settings],
  )

  const SplashWithParams = useCallback(
    () => (
      <SplashScreen
        settings={settings}
        onCheckDevice={checkDevice}
      />
    ),
    [checkDevice, settings],
  )

  const SignInWithParams = useCallback(
    () => (
      <SignInScreen
        onDisconnect={disconnect}
        onSignIn={signIn}
      />
    ),
    [signIn, disconnect],
  )

  const ActivateWithParams = useCallback(
    () => (
      <ActivationScreen
        // request={serverReq}
        onDisconnect={disconnect}
        onActivate={activateDevice}
      />
    ),
    [activateDevice, disconnect],
  )

  const CompaniesWithParams = useCallback(
    () => <CompaniesScreen onLogout={logout} onSetCompany={setCompany} />,
    [activateDevice, disconnect],
  )

  useEffect(() => {
    console.log('mount nav')
    return () => {
      console.log('unmount nav')
    }
  }, [])

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {device ? (
        !user ? (
          <AuthStack.Screen
            name="Login"
            component={SignInWithParams}
            options={{ animationTypeForReplace: user ? 'pop' : 'push' }}
          />
        ) : (
          <AuthStack.Screen
            name="Company"
            component={CompaniesWithParams}
            options={{ animationTypeForReplace: 'push' }}
          />
        )
      ) : device === undefined ? (
        <>
          <AuthStack.Screen
            name="Splash"
            component={SplashWithParams}
            options={{ animationTypeForReplace: 'pop' }}
          />
          <AuthStack.Screen name="Config" component={CongfigWithParams} />
        </>
      ) : (
        <AuthStack.Screen
          name="Activation"
          component={ActivateWithParams}
          options={{ animationTypeForReplace: 'push' }}
        />
      )}
    </AuthStack.Navigator>
  )
}

export { AuthNavigator }
