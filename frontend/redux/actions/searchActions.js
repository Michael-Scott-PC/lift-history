import { GET_AUTOCOMPLETE_RESULTS } from './types';

import strapiAPI from '../../api/strapiAPI';

/**
 * @description: Returns a list of possible autocomplete search terms.
 * @param {object} values - Contains the 'searchTerm' property.
 */
export const autoComplete = values => async dispatch => {
  console.log('autoComplete called.');
  try {
    // Utilize Strapi filters
    const { data } = await strapiAPI.get(
      `/exercises?nameOfExercise_contains=${values}`
    );
    console.log(data);

    const possibleExercises = [];
    for (let obj of data) {
      //   console.log(obj.nameOfExercise);
      possibleExercises.push(obj.nameOfExercise);
    }

    console.log(possibleExercises);

    dispatch({
      type: GET_AUTOCOMPLETE_RESULTS,
      payload: possibleExercises,
    });
  } catch (error) {
    console.log(error);
  }
};
