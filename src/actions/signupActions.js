import axios from 'axios';
import { env } from '../Constants';
import { applicationIsLoading } from './applicationActions';

export function register(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(env.REACT_APP_API_URL + '/users', { user: data})
      .then(res => {
        dispatch(applicationIsLoading(true));
        if (res.status === 200) {
          return res;
        }
      }).catch((err) => {
        return err.response
        dispatch(applicationIsLoading(true));
      });
  }

}