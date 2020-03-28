import { SUCCESS_POST_FEEDBACK, ERROR_POST_FEEDBACK } from './types';
import strapiAPI from '../../api/strapiAPI';
import { setAlert } from './alertActions';

export const postFeedback = values => async dispatch => {
  console.log('feedbackACTIONS: ', values);

  try {
    const res = await strapiAPI.post('/feedback-forms', values);
    console.log(res);

    dispatch({
      type: SUCCESS_POST_FEEDBACK,
      payload: res.data
    });

    console.log('test');
    dispatch(
      setAlert(
        'Your feedback has been received! I will get back to you ASAP. Thank you.',
        'success'
      )
    );

    console.log('test2');
  } catch (error) {
    console.log(error);

    dispatch({
      type: ERROR_POST_FEEDBACK,
      payload: error
    });
  }
};
