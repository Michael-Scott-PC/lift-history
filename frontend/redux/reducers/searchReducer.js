import { GET_AUTOCOMPLETE_RESULTS, CLEAR_RESULTS } from '../actions/types';

const initialState = { results: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_AUTOCOMPLETE_RESULTS:
      return {
        results: payload,
      };
    case CLEAR_RESULTS:
      return {
        results: [],
      };
    default:
      return state;
  }
}
