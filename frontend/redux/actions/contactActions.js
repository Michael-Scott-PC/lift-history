import strapiAPI from '../../api/strapiAPI';
import { setAlert } from './alertActions';

/**
 * @description: Post contact form submission.
 * @param {object} values - Input values submitted from contact form.
 */
export const postContact = values => async dispatch => {
  try {
    const res = await strapiAPI.post('/contact-forms', values);
    const { status } = res;

    if (status === 200) {
      dispatch(
        setAlert(
          'Your message was successfully delivered.  Expect a response within 2 business days. Thank you.',
          'success'
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (status !== 200) {
      dispatch(
        setAlert(
          'There appears to be an issue with the server.  Please email msenochs@gmail.com with your inquiry. Thank you.',
          'danger'
        )
      );
    }
  }
};
