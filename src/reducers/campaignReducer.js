import { CAMPAIGN_FETCH_DATA_SUCCESS, SELECTED_CAMPAIGN_UPDATED } from '../constants/types';

export function campaigns(state = [], action) {
  console.log(action)
  switch (action.type) {
    case CAMPAIGN_FETCH_DATA_SUCCESS:
        return action.campaigns;

    default:
        return state;
  }
}


export function selectedCampaigns(state = [], action) {
  console.log(action)
  switch (action.type) {
    case SELECTED_CAMPAIGN_UPDATED:
        return action.campaigns;

    default:
        return state;
  }
}