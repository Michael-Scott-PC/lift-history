import { combineReducers } from 'redux';

import feedbackReducer from './feedbackReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  feedbackReducer,
  alertReducer,
  authReducer,
  profileReducer
});
