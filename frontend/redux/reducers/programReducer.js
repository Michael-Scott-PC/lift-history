import { HYDRATE } from 'next-redux-wrapper';

import {
  CREATE_USER_PROGRAM,
  LOAD_USER_PROGRAMS,
  REVALIDATE_MYPROGRAM,
} from '../actions/types';

const initialState = {
  statusCode: null,
  allPrograms: [],
  program: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case HYDRATE:
    //   return {
    //     ...state,
    //     ...payload,
    //   };
    case CREATE_USER_PROGRAM:
      return {
        ...state,
        statusCode: payload[0],
        program: payload[1],
      };
    case LOAD_USER_PROGRAMS:
    case REVALIDATE_MYPROGRAM:
      return {
        ...state,
        allPrograms: payload,
      };
    // case REVALIDATE_MYPROGRAM:
    //   return {
    //     ...state,
    //     revalidatedPrograms: payload,
    //   };
    default:
      return state;
  }
}
