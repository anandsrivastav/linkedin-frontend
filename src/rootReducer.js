import { combineReducers } from 'redux';

import { applicationIsLoading, userData } from './reducers/applicationReducer';
import { campaigns, selectedCampaigns } from './reducers/campaignReducer';
import { templates, template } from './reducers/templateReducer';
import auth from './reducers/auth';

export default combineReducers({
  applicationIsLoading,
  auth,
  campaigns,
  selectedCampaigns,
  userData,
  templates,
  template
});
