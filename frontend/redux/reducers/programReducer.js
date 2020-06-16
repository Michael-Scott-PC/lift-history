import { CREATE_USER_PROGRAM } from '../actions/types';

const initialState = {
  statusCode: null,
  program: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER_PROGRAM:
      return {
        ...state,
        statusCode: payload[0],
        program: payload[1],
      };
    default:
      return state;
  }
}
