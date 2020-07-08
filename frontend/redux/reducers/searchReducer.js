import { HYDRATE } from 'next-redux-wrapper';

import { GET_AUTOCOMPLETE_RESULTS } from '../actions/types';

const initialState = { results: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HYDRATE:
      return {
        ...state,
        ...payload,
      };
    case GET_AUTOCOMPLETE_RESULTS:
      return {
        results: payload,
      };
    default:
      return state;
  }
}
