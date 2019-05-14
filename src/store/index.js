import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';

import user from './user';
import auth from './auth';
import fiction from './fiction';

const reducers = combineReducers({
  user,
  auth,
  fiction,
  form: formReducer,
});

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;
