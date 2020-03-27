import { POST_FEEDBACK, ERROR_POST_FEEDBACK } from './types';
import strapiAPI from '../api/strapiAPI';

export const postFeedback = values => async dispatch => {
  console.log('feedbackACTIONS: ', values);
  const res = await strapiAPI.post('/feedback-forms', values);

  console.log(res);
};
