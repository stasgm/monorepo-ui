import { action } from 'typesafe-actions';
import actionTypes from './action.enum';
import { IDocPayload } from './types';

const docIsPending = () => action(actionTypes.DOC_PENDING);

const docSuccess = (docParams: IDocPayload) =>
  action(actionTypes.DOC__SUCCESS, docParams);

const docError = (error: IDocPayload) =>
  action(actionTypes.DOC__ERROR, error);

export { docError, docSuccess, docIsPending };
