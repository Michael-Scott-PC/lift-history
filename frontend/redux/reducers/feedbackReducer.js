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
    // case HYDRATE:
    //   return {
    //     ...state,
    //     feedback: payload.feedbackReducer.feedback,
    //     sent: payload.feedbackReducer.sent,
    //     error: payload.feedbackReducer.error,
    //   };
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
