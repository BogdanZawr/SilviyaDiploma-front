import axios from 'axios';

import { BASE_URL } from '../config';

import {
  SET_FICTIONLIST,
  FICTIONLIST_ERROR,
  DELETE_FICTION,
  ADD_NEWFICTION,
  GET_LIKELIST,
  GET_CHAPTERLIST,
  CREATECHAPTER_ERROR,
  GET_COMMENTLIST,
  COMMENT_ERROR,
} from '../constant/auth';

const getFictionListUrl = `${BASE_URL}/api/v1/fiction/getFilteredList`;
const createFictionUrl = `${BASE_URL}/api/v1/fiction/create`;
const deleteFictionUrl = `${BASE_URL}/api/v1/fiction/delete`;

export const setFictionList = data => {
  return {
    type: SET_FICTIONLIST,
    data,
  }
};

export const removeFiction = data => {
  return {
    type: DELETE_FICTION,
    data,
  }
};

export const getFictionListError = data => {
  return {
    type: FICTIONLIST_ERROR,
    data,
  }
};

export const createChapterError = error => {
  return {
    type: CREATECHAPTER_ERROR,
    error,
  }
};

export const addNewFiction = data => {
  return {
    type: ADD_NEWFICTION,
    data,
  }
};

export const addLikeList = data => {
  return {
    type: GET_LIKELIST,
    data,
  }
};

export const addChapterList = data => {
  return {
    type: GET_CHAPTERLIST,
    data,
  }
};

export const addCommentList = data => {
  return {
    type: GET_COMMENTLIST,
    data,
  }
};

export const createCommentError = error => {
  return {
    type: COMMENT_ERROR,
    error,
  }
};

export const getFictionList = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: getFictionListUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      params: data,
    });

    dispatch(setFictionList(res.data));
  } catch (error) {
    dispatch(getFictionListError(error.response.data));
  }
};

export const createFiction = (data, history) => async (dispatch) => {
  const lSore = JSON.parse(localStorage.getItem('token'));  
  try {
    const res = await axios({
      method: 'post',
      url: createFictionUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lSore.accessToken}`,
      },
      data,
    });
  dispatch(addNewFiction(res.data));
  history.push('/homePage');
  } catch (error) {
  dispatch(getFictionListError(error.response.data));
  }
};

export const deleteFiction = (data) => async (dispatch) => {
  const lSore = JSON.parse(localStorage.getItem('token'));
  try {
    const res = await axios({
      method: 'post',
      url: deleteFictionUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lSore.accessToken}`,
      },
      data: {
        _id: data._id,
      },
    });
  dispatch(removeFiction(res.data));
  } catch (error) {
  dispatch(getFictionListError(error.response.data));
  }
};

export const getLikeList = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/api/v1/like/list/${data}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  dispatch(addLikeList(res.data));
  } catch (error) {
  dispatch(getFictionListError(error.response.data));
  }
};

export const like = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/like/create`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  dispatch(addLikeList(res.data));
  } catch (error) {
  dispatch(getFictionListError(error.response.data));
  }
};

export const getChapterList = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/api/v1/chapter/list`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: data,
    });
  dispatch(addChapterList(res.data));
  } catch (error) {
  dispatch(getFictionListError(error.response.data));
  }
};

export const createChupter = (data, history) => async (dispatch) => {
  const lSore = JSON.parse(localStorage.getItem('token'));
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/chapter/create`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lSore.accessToken}`,
      },
      data,
    });
  dispatch(addChapterList(res.data));
  history.goBack();
  } catch (error) {
  dispatch(createChapterError(error.response.data));
  }
};

export const deleteChapter = (data) => async (dispatch) => {
  const lSore = JSON.parse(localStorage.getItem('token'));
  try {
    const res = await axios({
      method: 'delete',
      url: `${BASE_URL}/api/v1/chapter/delete/${data._id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lSore.accessToken}`,
      },
    });    
  dispatch(addChapterList(res.data));
  } catch (error) {
  dispatch(createChapterError(error.response.data));
  }
};

export const getCommentsList = (data) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'get',
      url: `${BASE_URL}/api/v1/comment/list/${data}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });    
  dispatch(addCommentList(res.data));
  } catch (error) {
  dispatch(createCommentError(error.response.data));
  }
};

export const createComment = (data) => async (dispatch) => {
  const lSore = JSON.parse(localStorage.getItem('token'));
  try {
    const res = await axios({
      method: 'post',
      url: `${BASE_URL}/api/v1/comment/create`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lSore.accessToken}`,
      },
      data,
    });
  dispatch(addCommentList(res.data));
  } catch (error) {
  dispatch(createCommentError(error.response.data));
  }
};

export const deleteComment = (data) => async (dispatch) => {
  const lSore = JSON.parse(localStorage.getItem('token'));
  
  try {
    const res = await axios({
      method: 'delete',
      url: `${BASE_URL}/api/v1/comment/delete/${data._id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lSore.accessToken}`,
      },
    });
  dispatch(addCommentList(res.data));
  } catch (error) {
  dispatch(createCommentError(error.response.data));
  }
};
