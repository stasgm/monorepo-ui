import { StoreWithAsyncReducers } from '@lib/common-store';
import { useStore } from 'react-redux'
import { Reducer } from 'redux'

export default (name: string, reducer: Reducer) => {
  const store: StoreWithAsyncReducers = useStore();

  if (!store.addReducer) { return }
  
  store.addReducer(name, reducer)
}