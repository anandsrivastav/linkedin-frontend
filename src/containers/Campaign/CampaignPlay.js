import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getCampaignPlay, selectCampaign, applyAction } from '../../actions/campaignActions';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Paginate } from 'react-pagination-component';
import { arrayUpdation } from '../../utils/featuredActions';
import { isEmpty } from 'lodash';
import Loader from '../../components/Loader/Loader';
import './_dashboard.css';
import { env } from '../../Constants';

class CampaignPlay extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 1,
      searchVal: '',
      currentFilter: null,
      filterDates: [],
      dateValue: null,
      errors: {}
    }
  }

  componentDidMount() {
    // console.log('${this.props.match.params.id}',this.props.match.params.id)
    this.props.getCampaignPlay(env.REACT_APP_API_URL + `/campaigns/${this.props.match.params.id}/start.json?page_number=`+1);
    
  }

  handleSelect = (e) => {
    let { selectedCampaigns, selectCampaign } = this.props;
    const campaignIds = arrayUpdation(selectedCampaigns, e.target.name)
    selectCampaign(campaignIds)
    this.setState({ errors: {}});
  }

  handleAction = (e) => {
    e.preventDefault();
    let newState = Object.assign(this.state, {});
    delete newState.errors.actionError
    newState.currentFilter = e.target.value
    this.setState(newState)
  }

  handleApply = (e) => {
    e.preventDefault();
    const { currentFilter } = this.state;
    const { selectedCampaigns } = this.props;
    let newState = Object.assign(this.state, {});

    if(isEmpty(currentFilter) || isEmpty(selectedCampaigns)) {
      newState.errors['actionError'] = 'Please select campaigns or action before submitting some action.'
    }

    if (isEmpty(newState.errors)) {
      this.props.applyAction(this.state.currentFilter, this.props.selectedCampaigns)
      .then((res) => {
        if(res.data.status === 200) {
          this.props.getCampaignPlay(env.REACT_APP_API_URL + `/campaigns/index`);
        }
      }).then((error) => {
        console.log(error);
      })
    } else {
      this.setState(newState);
    }
  }

  searchChange = (e) => {
    this.setState({ searchVal: e.target.value })
  }

  pageChange = (page, e) => {
    this.setState({ activePage: page})
  }

  getPages = (totalPages) => {
    totalPages = parseInt(totalPages)
    const { activePage } = this.state;
    const ary2 = [activePage, (activePage + 1)]
    const ary3 = [activePage, activePage + 1, activePage + 2]
    const pages = ((activePage + 2) <= totalPages) ? ary3 : (((activePage + 1) <=  totalPages) ? ary2 : [activePage])
    return pages
  }

  render() {
    let { campaignPlay, selectedCampaigns, isLoading } = this.props;
    const { activePage, searchVal, currentFilter, errors, filterDates } = this.state;
    // campaigns = campaigns.filter(record => record.url.includes(searchVal));

    // let records = JSON.parse(JSON.stringify((campaigns))).splice(activePage === 1 ? 0 : ((activePage - 1)*5), 5);
    // const totalPages = (campaigns.length / 5) + (((campaigns % 5) === 0) ? 0 : 1);
    // const pages = this.getPages(totalPages)
    console.log('campaignPlay',campaignPlay)
    return (
      <main>
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="add-new-campaign-bar mb-3 mt-3">
                         
                      </div>
                  </div>
              </div>
              
              <div className="row">
                  <div className="col-md-8">
                      {/*<div className="champaign-action-bar mb-3">
                                                    <form className="form-inline">
                                                        <select className="custom-select mr-1" id="champaign-bulk-action" defaultValue={currentFilter} onChange={this.handleAction}>
                                                            <option selected>Bulk Action</option>
                                                            <option value="Delete">Delete Champaign</option>
                                                        </select>
                          
                                                        <button className="btn btn-dark mr-3" type="submit" Name="champaign-bulk-action-apply" onClick={this.handleApply}>Apply</button>
                                                    </form>
                          
                                                </div>*/}    
                  </div>
                  <div className="col-md-4">
                      {/*<div className="campaign-search-bar mb-3">
                                                <form className="form-inline">
                                                    <input className="form-control mr-1" type="search" Name="search-champaign" value={searchVal} placeholder="Search Name" onChange={this.searchChange}/>
                                                </form>
                                            </div>*/}
                  </div>
              </div>            
              <div className="row">
                  <div className="col-md-12">
                      {
                        errors.actionError ? (
                          <div className="alert alert-danger" role="alert">
                            {errors.actionError}
                          </div>
                          ) : null
                      }
                      {
                        isLoading ? (
                          <Loader loading={true} />
                        ) : (
                          <React.Fragment>
                            <table className="table table-striped table-responsive-md table-bordered table-hover" id="add-new-champaign">
                                <thead className="thead-dark">
                                  <tr>
                                    <th scope="col" className="text-center">Select</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Location</th>                            
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                      (campaignPlay.length > 0 || typeof campaignPlay.data !== 'undefined') ? campaignPlay.data.profiles.map((campaign, index) => {
                                        return(
                                          <tr key={campaign.id}>
                                              <td className="single-champaign-action">
                                                <div className="form-group">
                                                    <input type="checkbox" onChange={this.handleSelect} name={campaignPlay.id} value="" selected={selectedCampaigns.includes(campaignPlay.id)} />
                                                </div>
                                              </td>
                                              <td>
                                                <img src={(campaign.image_url === "NA") ? '../../default.jpg' : campaign.image_url} /> <span> {campaign.full_name} </span>
                                              </td>
                                              <td>
                                                {campaign.title}
                                              </td>
                                              <td className="last-champaign-action">
                                                {campaign.location}
                                              </td>
                                          </tr>
                                        )
                                      }) : (
                                        <tr><td colSpan={4}>{campaignPlay.message}.</td></tr>
                                      )
                                    }
                                </tbody>
                            </table>

                           <div className="pagination-content-bar mb-3">
                                   
                            </div>     
                          </React.Fragment>
                        )
                      }
                  </div>
            </div>
          </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campaignPlay: state.campaignPlay,
    selectedCampaigns: state.selectedCampaigns,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaignPlay: (url) => dispatch(getCampaignPlay(url)),
    selectCampaign: (data) => dispatch(selectCampaign(data)),
    applyAction: (action, ids) => dispatch(applyAction(action, ids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPlay);
