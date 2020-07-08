import { HYDRATE } from 'next-redux-wrapper';

import { SUCCESS_POST_FEEDBACK, ERROR_POST_FEEDBACK } from '../actions/types';

const initialState = {
  feedback: '',
  sent: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case HYDRATE:
      return {
        ...state,
        ...payload,
      };
    case SUCCESS_POST_FEEDBACK:
      return {
        ...state,
        feedback: payload.feedback,
        sent: true,
      };
    case ERROR_POST_FEEDBACK:
      return {
        ...state,
        error: payload,
        sent: false,
      };
    default:
      return state;
  }
}
