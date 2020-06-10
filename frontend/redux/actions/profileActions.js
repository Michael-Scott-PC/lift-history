import Router from 'next/router';

import {
  CREATE_PROFILE,
  ERROR_CREATE_PROFILE,
  ATTACH_PROFILE,
  ERROR_ATTACH_PROFILE,
  UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE,
  CREATE_USER_PROGRAM,
} from './types';

import strapiAPI from '../../api/strapiAPI';

/**
 * @description: Create a profile for every new user
 * @param {string} jwt - jwt from registration
 */
export const createProfile = jwt => async dispatch => {
  console.log('createProfile ran.');
  try {
    const res = await strapiAPI.post(
      `/profiles`,
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    // The payload is the new entry from 'Profiles' content-type.
    // At this point, the 'User has one Profile' relationship has
    // not been established.
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR_CREATE_PROFILE,
      payload: error,
    });
  }
};

/**
 * @description: Update the new user with the new profile
 * @param {number} userId - User ID from 'Users' content-type
 * @param {number} profileId - Profile ID from 'Profiles' content-type
 * @param {string} jwt - jwt from registration.
 */
export const attachProfile = (userId, profileId, jwt) => async dispatch => {
  console.log('attachProfile ran.');
  try {
    const res = await strapiAPI.put(
      `/users/${userId}`,
      {
        profile: `${profileId}`,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      }
    );

    // The payload is actually our updated 'Users' content-type
    // with their new profile attached. 'User has one Profile'
    dispatch({
      type: ATTACH_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR_ATTACH_PROFILE,
      payload: error,
    });
  }
};

/**
 * @description: Update basic profile information.
 * @param {string} jwt - jwt from registration.
 * @param {number} userId - User ID from 'Users' content-type.
 * @param {number} profileId - Profile ID from 'Profiles' content-type.
 */
export const updateProfile = (
  values,
  jwt,
  userId,
  profileId
) => async dispatch => {
  try {
    if (userId === profileId) {
      const { data } = await strapiAPI.put(`/profiles/${profileId}`, values, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: UPDATE_PROFILE,
        payload: data,
      });

      Router.push('/dashboard');
    }
  } catch (error) {
    dispatch({
      type: ERROR_UPDATE_PROFILE,
      payload: error,
    });
  }
};

// update program for user
export const createUserProgram = (jwt, id, values) => async dispatch => {
  console.log(jwt);
  console.log(values);

  const userId = id;
  const { data } = await strapiAPI.get(
    `/exercises?nameOfExercise=${values.primaryExercise}`
  );

  const primaryExerciseId = data[0].id;

  const mapValues = {
    scheduleExercise: values.pickDate,
    isSuperSet: values.isSuperSet,
    isTripleSet: values.isTripleSet,
    thisDaysExercises: [
      {
        exercise: { id: primaryExerciseId },
        thisSetsAndReps: values.primarySetsAndReps.map(exercise => ({
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          rpe: values.rpe ? exercise.rpe : null,
          pct: values.pct ? exercise.pct : null,
        })),
      },
    ],
    users: [{ id: userId }],
  };

  console.log(mapValues);

  try {
    const res = await strapiAPI.post(`/my-programs`, mapValues, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(res);
    const { data } = res;

    dispatch({
      type: CREATE_USER_PROGRAM,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
