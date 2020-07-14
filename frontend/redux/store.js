import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index.js';

const initialState = {};

// const middleware = [thunk];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export const makeStore = context =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export const wrapper = createWrapper(makeStore, { debug: true });

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default store;
