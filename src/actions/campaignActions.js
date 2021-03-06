import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import { CAMPAIGN_FETCH_DATA_SUCCESS, SELECTED_CAMPAIGN_UPDATED, CAMPAIGN_PLAY_FETCH_DATA_SUCCESS } from '../constants/types';
import {REACT_API_URL} from '../constants/env.js'
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
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + '/campaigns', data)
      .then(res => {
        dispatch(applicationIsLoading(false));
        return res
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  }
}

export function applyAction(action, ids) {
  const data = { action_type: action, ids: ids.join(',') }
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    const querystring = require('querystring');
    const url = REACT_API_URL + `/campaign_operation`;
    return axios.get(url, {
      params: data,
      paramsSerializer: params => {
        return querystring.stringify(params)
      }      
    })
    .then((response) => {
      return response
    }).catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function getCampaigns(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url
    })
    .then((response) => {
      dispatch(applicationIsLoading(false));
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

export function campaignPlayFetchDataSuccess(campaignPlay) {
  return {
    type: CAMPAIGN_PLAY_FETCH_DATA_SUCCESS,
    campaignPlay
  }
}

export function getCampaignPlay(url) {

  axios.defaults.headers.common['linkedin_cookie'] = localStorage.linkedin_cookie;

  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url
    })
    .then((response) => {
      dispatch(applicationIsLoading(false));
        if((response.status !== 200) || (response.data.status === 404)) {
          throw Error(response.statusText);
          return [];
        } else {
          return response.data
        }
      }
    )
    .then(campaignPlay => {
      dispatch(campaignPlayFetchDataSuccess(campaignPlay));
      return campaignPlay
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}
