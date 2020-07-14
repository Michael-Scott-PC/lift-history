import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case HYDRATE:
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      console.log(typeof state);
      console.log(state);
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
