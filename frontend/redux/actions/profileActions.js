import Router from 'next/router';
import { GraphQLClient } from 'graphql-request';

import {
  CREATE_PROFILE,
  ERROR_CREATE_PROFILE,
  ATTACH_PROFILE,
  ERROR_ATTACH_PROFILE,
  UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE,
  CREATE_COLOR_CODE_EXERCISE,
  LOAD_PROFILE,
} from './types';

// import { getExerciseIds } from './programActions';

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
    console.log(error);
    dispatch({
      type: ERROR_ATTACH_PROFILE,
      payload: error,
    });
  }
};

export const loadUserProfile = (id, jwt, url) => async dispatch => {
  try {
    // const { data } = await strapiAPI.get(`/profiles/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${jwt}`,
    //   },
    // });
    // console.log('loadUserProfile data: ', data);
    // console.log('id: ', id);
    // console.log('jwt: ', jwt);
    // console.log('url: ', url);
    const graphqlClient = new GraphQLClient(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const query = `{
      profile(id: ${id}) {
        id
        firstName
        lastName
        birthday
        bio
        coach
        hsAthlete
        collegeAthlete
        bodybuilder
        powerlifter
        olylifter
        crossfitter
        personalTrainer
        noneOfTheAbove
        metric {
          id
          kg
          lbs
        }
        coach_or_trainers {
          id
          username
        }
        color_code_exercises {
          id
          color {
            id
            color
          }
          exercise {
            id
            nameOfExercise
          }
          isDefault
        }
      }
    }`;

    const res = await graphqlClient.request(query);
    console.log('loadUserProfile res: ', res);
    const { profile } = res;

    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    console.log(error);
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

      Router.push('/dashboard/[year]', `/dashboard/${currentYear}`);
    }
  } catch (error) {
    dispatch({
      type: ERROR_UPDATE_PROFILE,
      payload: error,
    });
  }
};

export const checkForColor = async (color, jwt) => {
  // // remove hash from hex color code
  // const sanitizedColor = color.slice(1);
  try {
    const { data } = await strapiAPI.get(`/default-colors?color=${color}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (data.length > 0) {
      console.log('checkForColor data: ', data);
      return data;
    }

    // dispatch(createColor(sanitizedColor, jwt));
  } catch (error) {
    console.log(error);
  }
};

export const createColor = async (color, jwt) => {
  console.log('createColor ran.');
  try {
    const { data } = await strapiAPI.post(
      `/default-colors`,
      { color: color },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log('createColor data: ', data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createColorCodeExercise = (
  primaryExerciseId,
  primaryExerciseBgColorId,
  isDefaultColor,
  jwt,
  id
) => async dispatch => {
  console.log(
    'createColorCodeExercise primaryExerciseBgColorId: ',
    primaryExerciseBgColorId
  );
  // const values = { primaryExercise, primaryExerciseBgColorId, isDefaultColor };
  // console.log('createColorCodeExercise values: ', values);

  // let [
  //   primaryExerciseId,
  //   secondaryExerciseId,
  //   thirdExerciseId,
  // ] = await getExerciseIds(values);
  console.log(
    'createColorCodeExercises primaryExerciseId: ',
    primaryExerciseId
  );

  const mapValues = {
    color: primaryExerciseBgColorId,
    exercise: primaryExerciseId,
    isDefault: isDefaultColor,
    profile: id,
  };
  console.log('createColorCodeExercises mapValues: ', mapValues);

  try {
    const res = await strapiAPI.post(`/color-code-exercises`, mapValues, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log('createColorCodeExercise res: ', res);

    dispatch({
      type: CREATE_COLOR_CODE_EXERCISE,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};
