import { IBaseUrl, ICompany, IDevice, IUser } from '@lib/types';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

import { IAuthState } from './types';

const init = createAction('AUTH/INIT')<IAuthState>();
export const setSettings = createAction('AUTH/SET_SETTINGS')<IBaseUrl>();

export const setSettingsForm = createAction('AUTH/SET_SETTINGS_FORM')<boolean>();
export const setCompany = createAction('SET_COMPANY_ID')<ICompany>();
export const disconnect = createAction('AUTH/DISCONNECT')();
export const logout = createAction('AUTH/LOGOUT')(); // TODO Сделать sync c выходом пользователя на сервере 

const checkDeviceAsync = createAsyncAction(
  'AUTH/CONNECTION',
  'AUTH/CONNECTION_SUCCCES',
  'AUTH/CONNECTION_FAILURE',
)<string, IDevice, string>();

const activateDeviceAsync = createAsyncAction(
  'AUTH/ACTIVATE_DEVICE',
  'AUTH/ACTIVATE_DEVICE_SUCCCES',
  'AUTH/ACTIVATE_DEVICE_FAILURE',
)<string, IDevice, string>();

const loginUserAsync = createAsyncAction(
  'AUTH/LOGIN',
  'AUTH/LOGIN_SUCCCES',
  'AUTH/LOGIN_FAILURE',
)<string | undefined, IUser, string>();

export const authActions = {
  init,
  setSettings,
  disconnect,
  setSettingsForm,
  logout,
  setCompany,
  checkDeviceAsync,
  loginUserAsync,
  activateDeviceAsync
};

export type AuthActionType = ActionType<typeof authActions>;