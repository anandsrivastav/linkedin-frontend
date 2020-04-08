import { combineReducers } from 'redux';

import { applicationIsLoading, userData } from './reducers/applicationReducer';
import { campaigns, selectedCampaigns, campaignPlay } from './reducers/campaignReducer';
import { templates, template } from './reducers/templateReducer';
import auth from './reducers/auth';

export default combineReducers({
  applicationIsLoading,
  auth,
  campaigns,
  selectedCampaigns,
  campaignPlay,
  userData,
  templates,
  template
});
