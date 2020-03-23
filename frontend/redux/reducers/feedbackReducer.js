import { POST_FEEDBACK, ERROR_POST_FEEDBACK } from '../actions/types';

const initialState = {
  category: [],
  feedback: '',
  sent: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POST_FEEDBACK:
      return {
        ...state,
        category: payload.category,
        feedback: payload.feedback,
        sent: true
      };
    case ERROR_POST_FEEDBACK:
      return {
        ...state,
        error: payload,
        sent: false
      };
    default:
      return state;
  }
}
