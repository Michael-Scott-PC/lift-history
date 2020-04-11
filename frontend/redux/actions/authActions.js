import Router from 'next/router';

import {
  REGISTER_USER,
  ERROR_REGISTER_USER,
  LOGIN_USER,
  ERROR_LOGIN_USER,
  LOAD_PROFILE,
  ERROR_LOAD_PROFILE
} from './types';
import strapiAPI from '../../api/strapiAPI';

/**
 * @description: register a new user
 * @param {object} values - input from the registration form (username,
 * email, password)
 */
export const registerUser = values => async dispatch => {
  try {
    const res = await strapiAPI.post('/auth/local/register', values);
    const {
      jwt,
      user: {
        id,
        username,
        role: { type }
      }
    } = res.data;

    dispatch({
      type: REGISTER_USER,
      payload: { jwt, id, username, type }
    });

    Router.push('/basic-profile-info');
  } catch (error) {
    console.log(error);

    dispatch({
      type: ERROR_REGISTER_USER,
      payload: error
    });
  }
};

/**
 * @description: login user.
 * @param {object} values - input from the login form (identifier, password).
 */
export const loginUser = values => async dispatch => {
  try {
    const res = await strapiAPI.post('/auth/local', values);
    console.log(res);
    const {
      jwt,
      user: {
        id,
        username,
        role: { type },
        profile
      }
    } = res.data;
    console.log(profile);

    dispatch({
      type: LOGIN_USER,
      payload: { jwt, id, username, type }
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: ERROR_LOGIN_USER,
      payload: error
    });

    dispatch({
      type: ERROR_LOAD_PROFILE,
      payload: error
    });
  }
};
