import { applicationIsLoading } from './applicationActions';
import axios from 'axios';
import { env } from '../Constants';

export function templatesFetchDataSuccess(templates) {
	return {
		type: 'TEMPLATE_FETCH_DATA_SUCCESS',
		templates
	}
}

export function fetchTemplates() {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: env.REACT_APP_API_URL + `/templates/index`
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
