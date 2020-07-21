import { SET_WEEK_RANGE, SET_WEEK_URL } from '../actions/types';

const initialState = {
  weekRangeURL: '',
  weekRange: [
    {
      month: '',
      day: '',
      year: '',
    },
  ],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_WEEK_RANGE:
      return {
        ...state,
        weekRange: payload,
      };
    case SET_WEEK_URL:
      return {
        ...state,
        weekRangeURL: payload,
      };
    default:
      return state;
  }
}
