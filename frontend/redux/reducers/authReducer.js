import { HYDRATE } from 'next-redux-wrapper';

import {
  REGISTER_USER,
  ERROR_REGISTER_USER,
  LOGIN_USER,
  ERROR_LOGIN_USER,
  LOGOUT_USER,
  TOGGLE_LOADING,
} from '../actions/types';

const initialState = {
  jwt: '',
  id: null,
  username: '',
  type: '',
  error: '',
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case HYDRATE:
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case REGISTER_USER:
      // localStorage.setItem('jwt', state.jwt);
      return {
        jwt: payload.jwt,
        id: payload.id,
        username: payload.username,
        type: payload.type,
      };
    case ERROR_REGISTER_USER:
      return {
        ...state,
        error: payload.error,
      };
    case LOGIN_USER:
      return {
        ...state,
        jwt: payload.jwt,
        id: payload.id,
        username: payload.username,
        type: payload.type,
        loading: false,
      };
    case ERROR_LOGIN_USER:
      return {
        ...state,
        error: payload,
      };
    case LOGOUT_USER:
      return {
        state: {},
      };
    default:
      return state;
  }
}
