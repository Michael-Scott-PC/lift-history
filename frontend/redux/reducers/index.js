import { combineReducers } from 'redux';

import feedbackReducer from './feedbackReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import calendarReducer from './calendarReducer';
import programReducer from './programReducer';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  feedbackReducer,
  alertReducer,
  authReducer,
  calendarReducer,
  programReducer,
  profileReducer,
  searchReducer,
});
