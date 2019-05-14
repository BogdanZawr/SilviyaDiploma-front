const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'USER_LIST_SUCCESS':
      return { ...state,  users: action.users };

    default:
      return state;
  }
}


export default userReducer;
