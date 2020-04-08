import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getCampaignPlay, selectCampaign, applyAction } from '../../actions/campaignActions';
import { ButtonToolbar, Button } from 'react-bootstrap';
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
    // this.props.getCampaignPlay(`http://0c1d0199.ngrok.io/campaigns/${this.props.match.params.id}/start.json`);
    
    this.props.getCampaignPlay(env.REACT_APP_API_URL + `/campaigns/${this.props.match.params.id}/start.json`);
    // this.props.getCampaignPlay(env.REACT_APP_API_URL + `/campaigns/index`);
    const dates = Array(4).fill(new Date().toDateString()).map((x, y) => {
      let date = new Date(x)
      date.setMonth(date.getMonth() + y)
      return date
    })
    this.setState({ filterDates: dates })
  }

  handleSelect = (e) => {
    let { selectedCampaigns, selectCampaign } = this.props;
    const campaignIds = arrayUpdation(selectedCampaigns, e.target.name)
    selectCampaign(campaignIds)
    this.setState({ errors: {}});
  }

  handleDateChange = (e) => {
    e.preventDefault();
    this.setState({ dateValue: e.target.value })
  }

  filterByDate = (e) => {
    e.preventDefault();
    this.props.getCampaignPlay(env.REACT_APP_API_URL + `/campaigns/index?date=${this.state.dateValue}`);
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
                                      (campaignPlay.length > 0) ? campaignPlay.map((campaign, index) => {
                                        return(
                                          <tr key={campaign.id}>
                                              <td className="single-champaign-action">
                                                <div className="form-group">
                                                    <input type="checkbox" onChange={this.handleSelect} name={campaignPlay.id} value="" selected={selectedCampaigns.includes(campaignPlay.id)} />
                                                </div>
                                              </td>
                                              <td>
                                                <img src={campaign.image_url} /> <span> {campaign.full_name} </span>
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
                                        <tr><td colSpan={4}>No campaigns found. Please create new.</td></tr>
                                      )
                                    }
                                </tbody>
                            </table>

                           {/* <div className="pagination-content-bar mb-3">
                                                           <nav aria-label="...">
                                                               <ul className="pagination justify-content-end">
                                                                 <li className={`page-item ${activePage <= 1 ? 'disabled' : ""}`}>
                                                                   <Link className="page-link" to="#" tabIndex="-1" aria-disabled="true" onClick={this.pageChange.bind(this, activePage - 1)}>Previous</Link>
                                                                 </li>
                                                                 {
                                                                   pages.map((val) => (
                                                                     <li className={`page-item ${(activePage === val) ? 'active' : ''}`} key={val} onClick={this.pageChange.bind(this, val)}>
                                                                       <Link className="page-link" to="#">{val} </Link>
                                                                     </li>
                                                                   ))
                                                                 }
                                                                 {
                                                                   (totalPages < (activePage + 1)) ? (
                                                                     <li className="page-item" onClick={ (e) => this.pageChange.bind(e, activePage - 1)} onClick={this.pageChange.bind(this, activePage + 1)}>
                                                                       <Link className="page-link" to="#">Next</Link>
                                                                     </li>
                                                                   ) : null
                                                                 }
                                                               </ul>
                                                             </nav>
                                                       </div>  */}
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