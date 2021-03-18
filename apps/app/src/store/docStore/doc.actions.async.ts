import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import {
  docIsPending,
  docSuccess,
  docError,
} from './doc.action.creators';
import { IDocPayload } from './types';

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/
/**
 *
 * @param username
 * @param password
 */
export const DocLoadAction = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    let response: IDocPayload = {};

    dispatch(docIsPending());

    response = { docData: { number: 1 } }

    if (response) {
      return dispatch(docSuccess(response));
    }
    /*  if (username === 'aymen') {
       if (password === '123') {
         response = {
           docData: {
             username: 'aymen',
             email: 'mohamedaymen.ourabi@gmail.com',
           },
           token: '2auyeiuahiuui87998',
         };
         localStorage.setItem('token', String(response.token));
         return dispatch(docSuccess(response));
       }
       response = {
         errorMessage: 'password incorrect',
       };
       return dispatch(docError(response));
     }
    */
    response = {
      errorMessage: 'user does not exist',
    };
    return dispatch(docError(response));
  };
};