import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text, View, StyleSheet } from 'react-native';
import { RootState, userActions } from '@lib/common-store';

import useAddReducer from '../utils/useAddReducer';
import docReducer from '../store/docStore/doc.reducer';
import { IDocState, IDocument } from '../store/docStore/types';


export const MyDocuments = () => {
  useAddReducer('docs', docReducer);

  const { docData } = useSelector((state: RootState & { docs: IDocState }) => state.docs);

  const dispatch = useDispatch();

  const handleLoad = async () => {
    dispatch(userActions.LoginAction({ userName: 'Stas', 'password': '123' }));
  }

  // const docData: IDocument[] = [];

  return (
    <View>
      <Button title="Load documents" onPress={handleLoad} />
      <Text>docData:</Text>
      <Text>{docData?.[0].number || 'no my data'}</Text>
    </View >
  )
}

export const Mytext = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { settings } = useSelector((state: RootState) => state.auth);

/*   const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(userActions.LoginAction({ userName: 'Stas', 'password': '123' }));
  } */

  return (
    <View>
      {/* <Button title="Load user" onPress={handleLogin} /> */}
      <Text>ID: {user?.id || 'no data'}</Text>
      <Text>NAME: {user?.userName || 'no data'}</Text>
      <Text>serverName: {settings?.server || 'no data'}</Text>
      <Text>port: {settings?.port || 'no data'}</Text>
      <MyDocuments />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  }
})