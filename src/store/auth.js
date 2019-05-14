import _ from 'lodash';

import {
  SET_USER,
  SET_TOKEN,
  DROP_USER,
  DROP_TOKEN,
  LOGIN_ERROR,
  REGISTER_ERROR,
} from '../constant/auth';

const initial = {
  user: null,
  token: null,
  error: null,
  registerErrors: null,
};

const authReducer = (state = initial, action) => {
  switch(action.type) {
    case DROP_USER:
      return {
        ...state,
        user: null,
      };

    case DROP_TOKEN:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
      };

    case SET_USER:
      return {
        ...state,
        user: _.omit(action.user, ['accessToken', 'refreshToken']),
      };

    case SET_TOKEN:
      const token = _.assignIn(state.token || {}, _.pick(action.token, ['accessToken', 'refreshToken']));

      localStorage.setItem('token', JSON.stringify(token));

      return {
        ...state,
        token,
      };

    case LOGIN_ERROR:
      return { ...state,  error: action.error };

    case REGISTER_ERROR:
      return { ...state,  registerErrors: action.error };

    default:
      return state;
  }
};

export default authReducer;
