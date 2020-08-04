import { GET_AUTOCOMPLETE_RESULTS, CLEAR_RESULTS } from './types';

import strapiAPI from '../../api/strapiAPI';

/**
 * @description: Returns a list of possible autocomplete search terms.
 * @param {object} values - Contains the 'searchTerm' property.
 */
export const autoComplete = values => async dispatch => {
  try {
    // Utilize Strapi filters
    const { data } = await strapiAPI.get(
      `/exercises?nameOfExercise_contains=${values}&_limit=5`
    );

    const possibleExercises = [];
    for (let obj of data) {
      // console.log('obj: ', obj);
      const { id, nameOfExercise, default_color } = obj;
      //   console.log(obj.nameOfExercise);
      possibleExercises.push({ id, nameOfExercise, default_color });
    }

    // console.log('possibleExercises: ', possibleExercises);

    dispatch({
      type: GET_AUTOCOMPLETE_RESULTS,
      payload: possibleExercises,
    });
  } catch (error) {
    console.log(error);
  }
};

export const clearResults = () => dispatch => {
  try {
    dispatch({
      type: CLEAR_RESULTS,
    });
  } catch (error) {
    console.log(error);
  }
};
