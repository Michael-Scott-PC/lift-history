import {
  CREATE_PROFILE,
  ERROR_CREATE_PROFILE,
  ATTACH_PROFILE,
  ERROR_ATTACH_PROFILE,
  LOAD_PROFILE,
  ERROR_LOAD_PROFILE,
  UPDATE_PROFILE,
  ERROR_UPDATE_PROFILE,
  REVALIDATE_PROFILE,
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
      return {
        ...state,
        profile: payload,
      };
    case REVALIDATE_PROFILE:
      const { color_code_exercises } = payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          color_code_exercises: [...color_code_exercises],
        },
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
