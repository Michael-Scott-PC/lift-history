import Router from 'next/router';

import { currentYear } from '../../utils/currentDate';

import {
  REGISTER_USER,
  ERROR_REGISTER_USER,
  LOGIN_USER,
  ERROR_LOGIN_USER,
  LOAD_PROFILE,
  ERROR_LOAD_PROFILE,
  LOGOUT_USER,
  LOAD_USER_PROGRAMS,
  TOGGLE_LOADING,
} from './types';
import strapiAPI from '../../api/strapiAPI';

import { setAlert } from './alertActions';

/**
 * @description: register a new user
 * @param {object} values - Input from the registration form (username,
 * email, password)
 */
export const registerUser = values => async dispatch => {
  try {
    const res = await strapiAPI.post('/auth/local/register', values);
    console.log(res);
    const {
      jwt,
      user: {
        id,
        username,
        role: { type },
      },
    } = res.data;

    dispatch({
      type: REGISTER_USER,
      payload: { jwt, id, username, type },
    });

    Router.push('/basic-profile-info');
  } catch (error) {
    console.log(error);

    dispatch({
      type: ERROR_REGISTER_USER,
      payload: error,
    });
  }
};

/**
 * @description: login user.
 * @param {object} values - Input from the login form (identifier, password).
 */
export const loginUser = values => async dispatch => {
  dispatch({
    type: TOGGLE_LOADING,
  });
  try {
    const res = await strapiAPI.post('/auth/local', values);
    const {
      jwt,
      user: {
        id,
        myPrograms,
        profile,
        role: { type },
        username,
      },
    } = res.data;

    dispatch({
      type: LOGIN_USER,
      payload: { jwt, id, username, type },
    });

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });

    dispatch({
      type: LOAD_USER_PROGRAMS,
      payload: myPrograms,
    });

    Router.push('/dashboard/[year]', `/dashboard/${currentYear}`);
  } catch (error) {
    console.log(error);

    dispatch(setAlert('Incorrect username or password.', 'danger'));

    dispatch({
      type: ERROR_LOGIN_USER,
      payload: error,
    });

    dispatch({
      type: ERROR_LOAD_PROFILE,
      payload: error,
    });
  }
};

export const logoutUser = () => async dispatch => {
  console.log('logoutUser ran.');
  dispatch({
    type: LOGOUT_USER,
  });
};
