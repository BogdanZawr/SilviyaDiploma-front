import axios from 'axios';

import tokenHandle from '../util/tokenHandle';
import { BASE_URL } from '../config';

import {
  SET_USER,
  SET_TOKEN,
  DROP_USER,
  DROP_TOKEN,
  LOGIN_ERROR,
  REGISTER_ERROR,
} from '../constant/auth';

const refreshTokenUrl = `${BASE_URL}/api/v1/access/refreshToken`;
const loginUrl = `${BASE_URL}/api/v1/access/login`;
const loginConfirmUrl = `${BASE_URL}/api/v1/authAccess/loginConfirm`;

export const setUser = user => {
  return {
    type: SET_USER,
    user,
  }
};

export const dropUser = () => {
  return {
    type: DROP_USER,
  }
};

export const setToken = token => {
  return {
    type: SET_TOKEN,
    token,
  }
};

export const dropToken = () => {
  return {
    type: DROP_TOKEN,
  }
};

export const loginError = error => {
  return {
    type: LOGIN_ERROR,
    error,
  }
};

export const registerError = error => {
  return {
    type: REGISTER_ERROR,
    error,
  }
};

export const login = data => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: loginUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });

    dispatch(setUser(res.data));
    dispatch(setToken(res.data));
  } catch (error) {
    dispatch(loginError(error.response.data));
  }
};

export const refreshToken = () => (dispatch, getState) => {
  let refreshToken = '';

  const auth = getState().auth;

  if (auth.token && auth.token.accessToken) {
    refreshToken = auth.token.refreshToken;
  }

  return axios({
    method: 'post',
    url: refreshTokenUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      refreshToken,
    },
  });
};

export const loginConfirm = () => async (dispatch) => {
  try {
    const res = await tokenHandle({
      method: 'get',
      url: loginConfirmUrl,
    });

    dispatch(setUser(res.data));
  } catch (error) {
    dispatch(loginError(error.response.data));
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/access/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  dispatch(setUser(res.data));
  dispatch(setToken(res.data));
  } catch (error) {
  dispatch(registerError(error.response.data));
  }
};
