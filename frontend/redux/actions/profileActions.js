import {
  CREATE_PROFILE,
  ERROR_CREATE_PROFILE,
  ATTACH_PROFILE,
  ERROR_ATTACH_PROFILE
} from './types';

import strapiAPI from '../../api/strapiAPI';

/**
 * @description: create a profile for every new user
 * @param {string} jwt - jwt from registration
 */
export const createProfile = jwt => async dispatch => {
  try {
    const res = await strapiAPI.post(
      `/profiles`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    );

    // The payload is the new entry from 'Profiles' content-type.
    // At this point, the 'User has one Profile' relationship has
    // not been established.
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_CREATE_PROFILE,
      payload: error
    });
  }
};

/**
 * @description: update the new user with the new profile
 * @param {number} userId - User ID from 'Users' content-type
 * @param {number} profileId - Profile ID from 'Profiles' content-type
 * @param {string} jwt - jwt from registration.
 */
export const attachProfile = (userId, profileId, jwt) => async dispatch => {
  try {
    const res = await strapiAPI.put(
      `/users/${userId}`,
      {
        profile: `${profileId}`
      },
      {
        headers: { Authorization: `Bearer ${jwt}` }
      }
    );

    // The payload is actually our updated 'Users' content-type
    // with their new profile attached. 'User has one Profile'
    dispatch({
      type: ATTACH_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ERROR_ATTACH_PROFILE,
      payload: error
    });
  }
};

// create a new dashboard for every new user
