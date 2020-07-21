import { SET_WEEK_RANGE, SET_WEEK_URL } from './types';

export const setCurrentWeekRangeGlobal = values => async dispatch => {
  const mapValues = values.map(value => {
    const month = value[0];
    const day = value[1];
    const year = value[2];
    return {
      month: month,
      day: day,
      year: year,
    };
  });

  dispatch({
    type: SET_WEEK_RANGE,
    payload: mapValues,
  });
};

export const setCurrentWeekURLGlobal = weekURL => async dispatch => {
  dispatch({
    type: SET_WEEK_URL,
    payload: weekURL,
  });
};
