import {
  CREATE_PROFILE,
  ERROR_CREATE_PROFILE,
  ATTACH_PROFILE,
  ERROR_ATTACH_PROFILE,
  LOAD_PROFILE,
  ERROR_LOAD_PROFILE,
  UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE,
  CREATE_USER_PROGRAM,
} from '../actions/types';

const initialState = {
  profile: {},
  error: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROFILE:
    case ATTACH_PROFILE:
    case LOAD_PROFILE:
    case UPDATE_PROFILE:
    case CREATE_USER_PROGRAM:
      return {
        ...state,
        profile: payload,
      };
    case ERROR_CREATE_PROFILE:
    case ERROR_LOAD_PROFILE:
    case ERROR_ATTACH_PROFILE:
    case ERROR_UPDATE_PROFILE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
