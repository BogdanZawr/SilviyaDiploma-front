import _ from 'lodash';

import {
  SET_FICTIONLIST,
  FICTIONLIST_ERROR,
  ADD_NEWFICTION,
  DELETE_FICTION,
  GET_LIKELIST,
  GET_CHAPTERLIST,
  CREATECHAPTER_ERROR,
  GET_COMMENTLIST,
  COMMENT_ERROR,
} from '../constant/auth';

const initial = {
  fictionList: {},
  error: null,
  createChupterErrors: {},
  like: 0,
  chapterList: {},
  commentList: []
};

const authReducer = (state = initial, action) => {
  switch(action.type) {
    case SET_FICTIONLIST:
    return {
      ...state,
      fictionList: action.data,
    };

    case FICTIONLIST_ERROR:
    return {
      ...state,
      error: action.data,
    };

    case GET_LIKELIST:
    const length = action.data.length
    return {
      ...state,
      like: length,
    };

    case ADD_NEWFICTION:
    return {
      ...state,
      // fictionList,
    };

    case CREATECHAPTER_ERROR:
    return {
      ...state,
      createChupterErrors: action.error,
    };

    case GET_CHAPTERLIST:    
    return {
      ...state,
      chapterList: action.data,
    };

    case COMMENT_ERROR:    
    return {
      ...state,
      commentErrors: action.error,
    };

    case GET_COMMENTLIST:    
    return {
      ...state,
      commentList: action.data,
    };


    case DELETE_FICTION:
    let fictionList = {...state.fictionList};

    for (let i = 0; i < fictionList.results.length; i++) {
      if (fictionList.results[i]._id === action.data._id) {
        fictionList.results.splice(i, 1);
        break;
      }
    }
    
    return {
      ...state,
      fictionList,
    };

    default:
      return state;
  }
};

export default authReducer;
