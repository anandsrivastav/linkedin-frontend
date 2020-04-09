import axios from 'axios';
import { env } from '../Constants';
import jwtdecode from 'jwt-decode';
import { SET_CURRENT_USER, SET_USER_DATA } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { applicationIsLoading } from './applicationActions';
import {REACT_API_URL} from '../constants/env.js'

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user: user
  }
}

export function setUserData(user) {
  return {
    type: SET_USER_DATA,
    user
  }
}

export function setAuthToken(token) {
  return dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenDate');
    localStorage.setItem('accessToken', token);
    localStorage.setItem('accessTokenDate', (new Date()).getTime() );

    setAuthorizationToken(token);
    dispatch(setCurrentUser(token));
  };
}

export function resetPassword(data) {
  return dispatch => axios.post(REACT_API_URL + '/recover_password', data)
    .then(res => {
      return res
    }).catch((err) => {
      return err.response
    });
}

export function login(loginData) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/authenticate', loginData)
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          const token = res.data.auth_token;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('accessTokenDate');

          localStorage.setItem('accessToken', token);
          localStorage.setItem('accessTokenDate', (new Date()).getTime());

          setAuthorizationToken(token);
          dispatch(setCurrentUser(jwtdecode(token)));
          return res;
        }
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  } 
}

export function authorizeToken(data) {
  return dispatch => axios.post(REACT_API_URL + '/authorize_token', data)
    .then(res => {
      return res
    }).catch((err) => {
      return err.response
    });
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenDate');
    
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));

  };
}
