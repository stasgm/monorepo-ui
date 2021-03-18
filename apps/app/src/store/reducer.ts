import { Action } from 'redux';

const myActions: Action = {type: 'ADD'}

export interface MyState {
  username: string;
}

const initialState: MyState = {
  username: 'localhost'
}

const myReducer = (state = initialState, action: typeof myActions) => {
  switch (action.type) {
    case 'ADD':
      return state;

    default:
      return state;
  }
}


export default myReducer;