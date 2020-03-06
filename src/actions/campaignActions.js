import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import { CAMPAIGN_FETCH_DATA_SUCCESS, SELECTED_CAMPAIGN_UPDATED } from '../constants/types';

import { env } from '../Constants';

export function campaignFetchDataSuccess(campaigns) {
  return {
    type: CAMPAIGN_FETCH_DATA_SUCCESS,
    campaigns
  }
}

export function selectCampaign(campaigns) {
  return {
    type: SELECTED_CAMPAIGN_UPDATED,
    campaigns
  }
}

export function submitCampaign(data) {
  return dispatch => axios.post(env.REACT_APP_API_URL + '/campaigns', data)
    .then(res => {
      return res
    }).catch((err) => {
      return err.response
    });
}

export function getCampaigns() {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: env.REACT_APP_API_URL + `/campaigns/index`
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data
        }
      }
    )
    .then(campaigns => {
      dispatch(campaignFetchDataSuccess(campaigns));
      return campaigns
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}
