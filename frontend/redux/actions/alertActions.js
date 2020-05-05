import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * @description: Controls an alert displayed in the UI.
 * @param {string} msg -  success or failure message displayed to user.
 * @param {string} alertType - 'success' or 'danger' used to determine alert message css.
 * @param {number} timeout - dictates duration of alert message before disappearing.
 */
export const setAlert = (msg, alertType, timeout = 7000) => dispatch => {
  console.log('setAlert called.');
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
