import { combineReducers } from 'redux';

import feedbackReducer from './feedbackReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  feedbackReducer,
  alertReducer
});
