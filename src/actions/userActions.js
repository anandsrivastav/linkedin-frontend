import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import { setCurrentUser, setUserData } from './authActions';
import { env } from '../Constants';

export function fetchCurrentUser(){
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: env.REACT_APP_API_URL + `users/get_current_user`,
      headers: {
        Authorization: localStorage.accessToken,
        "content-type": "multipart/form-data"
      }
    })
    .then(
      response => {
        if(response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.data.user
      }
    )
    .then(userDetails => {
      // dispatch(setCurrentUser(userDetails))
      // dispatch(applicationIsLoading(false));
      dispatch(setUserData(userDetails))
      return userDetails
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}
