import { applicationIsLoading } from './applicationActions';
import axios from 'axios';
import { env } from '../Constants';
import {REACT_API_URL} from '../constants/env.js'

export function templatesFetchDataSuccess(templates) {
	return {
		type: 'TEMPLATE_FETCH_DATA_SUCCESS',
		templates
	}
}

export function selectTemplate(template) {
  return {
    type: 'SELECT_TEMPLATE',
    template
  }
}


export function fetchTemplates() {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/templates/index`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data.templates
        }
      }
    )
    .then(campaigns => {
      dispatch(templatesFetchDataSuccess(campaigns));
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}


export function saveTemplate(data) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/authenticate', data)
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          return res;
        }
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  } 
}



export function deleteTemplate() {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + `/templates`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data.templates
        }
      }
    )
    .then(campaigns => {
      dispatch(templatesFetchDataSuccess(campaigns));
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}