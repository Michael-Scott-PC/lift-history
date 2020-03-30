import strapiAPI from '../../api/strapiAPI';

import { setAlert } from '../actions/alertActions';

export const postFeatureReq = values => async dispatch => {
  try {
    const res = await strapiAPI.post('/feature-request-forms', values);
    const { status } = res;

    if (status === 200) {
      dispatch(
        setAlert(
          'Your feature request has successfully been delivered. Expect a response within 2 business days. Thank you.',
          'success'
        )
      );
    }
  } catch (error) {
    console.log(error);

    if (status !== 200) {
      dispatch(
        setAlert(
          'There appears to be an issue with the server.  Please email your request to msenochs@gmail.com. Thank you',
          'danger'
        )
      );
    }
  }
};
