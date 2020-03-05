import isEmpty from 'lodash/isEmpty'
import { SET_CURRENT_USER, USER_EXIST } from '../actions/types';

const initialState = {
  isAuthenticated: false,
user: {},
  error: ''
}

export default(state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        error: ''
      }
    case USER_EXIST: {
      return {
        ...state,
        error: action.error
      }
    }
    default: return state;
  }
}
