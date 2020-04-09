import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getCampaigns, selectCampaign, applyAction } from '../../actions/campaignActions';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import { arrayUpdation } from '../../utils/featuredActions';
import { isEmpty } from 'lodash';
import Loader from '../../components/Loader/Loader';
import './_dashboard.css';
import { env } from '../../Constants';
import {REACT_API_URL} from '../../constants/env.js'

class Dashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      activePage: 1,
      searchVal: '',
      currentFilter: null,
      filterDates: [],
      dateValue: null,
      errors: {},
      show: false,
      campaignIds: '',
      linkedin_cookie: localStorage.linkedin_cookie,
      errorMsg: ""
    }
  }

  componentDidMount() {
    this.props.getCampaigns(REACT_API_URL + `/campaigns/index`);
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
    this.props.getCampaigns(REACT_API_URL + `/campaigns/index?date=${this.state.dateValue}`);
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
          this.props.getCampaigns(REACT_API_URL + `/campaigns/index`);
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

  campaignPlay = (e) => {
    e.preventDefault(); 
    if(this.state.linkedin_cookie !== ""){
      localStorage.setItem('linkedin_cookie', this.state.linkedin_cookie);
      this.props.history.push(`/campaign/play/${this.state.campaignIds}`)
    }else{
      this.setState({errorMsg: 'Please Enter Linkedin cookie.("li_at")'})
    }
    
    //console.log('campaignIds',campaignIds)
    // this.props.history.push('/campaign/play')
    // this.props.history.push(`/campaign/play/${campaignIds}`)
  }


  handleShow = (campaignIds) => {
      this.setState({show: true, campaignIds: campaignIds})
  };

  handleClose = () => {
      this.setState({show: false})
  }; 

  fieldValChange = (e) => {
    this.setState({[e.target.name] : e.target.value, errorMsg: ''})
  }

  render() {
    let { campaigns, selectedCampaigns, isLoading } = this.props;
    const { activePage, searchVal, currentFilter, errors, filterDates } = this.state;
    campaigns = campaigns.filter(record => record.url.includes(searchVal));

    let records = JSON.parse(JSON.stringify((campaigns))).splice(activePage === 1 ? 0 : ((activePage - 1)*5), 5);
    const totalPages = (campaigns.length / 5) + (((campaigns % 5) === 0) ? 0 : 1);
    const pages = this.getPages(totalPages)

    return (
      <main>
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="add-new-campaign-bar mb-3 mt-3">
                          <Link to="/campaign/new"><button className="btn btn-dark" type="button" Name="add-new-champaign">Add New Campaign</button></Link>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-8">
                      <div className="campaign-status-bar mb-3">
                          <nav className="nav">
                              <Link className="nav-link active" to="#">All <span>({campaigns.length})</span></Link>
                              <Link className="nav-link" to="#">Started Campaign <span>({campaigns.filter(camp => camp.status === 'Started').length})</span></Link>
                              <Link className="nav-link" to="#">Pause Campaign <span>({campaigns.filter(camp => camp.status === 'Pause').length})</span></Link>
                              <Link className="nav-link" to="#">Ended Campaign <span>({campaigns.filter(camp => camp.status === 'Ended').length})</span></Link>
                          </nav>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="campaign-search-bar mb-3">
                          <form className="form-inline">
                              <input className="form-control mr-1" type="search" Name="search-champaign" value={searchVal} placeholder="Search Champaign" onChange={this.searchChange}/>
                          </form>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <div className="champaign-action-bar mb-3">
                          <form className="form-inline">
                              <select className="custom-select mr-1" id="champaign-bulk-action" defaultValue={currentFilter} onChange={this.handleAction}>
                                  <option selected>Bulk Action</option>
                                  <option value="Delete">Delete Champaign</option>
                                  <option value="Start">Start Champaign</option>
                                  <option value="Pause">Pause Champaign</option>
                                  <option value="End">End Champaign</option>
                              </select>

                              <button className="btn btn-dark mr-3" type="submit" Name="champaign-bulk-action-apply" onClick={this.handleApply}>Apply</button>

                              <select className="custom-select mr-1" id="champaign-bulk-action" onChange={this.handleDateChange}>
                                  <option>All Dates</option>
                                  {
                                    filterDates.map((val, index) => {
                                      return(
                                        <option key={val}>{val.toDateString()}</option>
                                      )
                                    })
                                  }
                              </select>

                              <button className="btn btn-dark mr-3" type="submit" Name="champaign-filter" onClick={this.filterByDate}>Filter</button>
                          </form>

                      </div>    
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
                                    <th scope="col">Campaign URL</th>
                                    <th scope="col">Note Message</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Action</th>                            
                                  </tr>
                                </thead>
                                <tbody>
                                    {
                                      (campaigns.length > 0) ? records.map((campaign, index) => {
                                        return(
                                          <tr key={campaign.id}>
                                              <td>
                                                <div className="form-group">
                                                    <input type="checkbox" onChange={this.handleSelect} name={campaign.id} value="" selected={selectedCampaigns.includes(campaign.id)} />
                                                </div>
                                              </td>
                                              <td>
                                                {campaign.url}
                                              </td>
                                              <td>
                                                <ul>
                                                  {
                                                    campaign.campaign_messages.map((message) => (
                                                      <li key={message.id}>{message.description}</li>
                                                    ))
                                                  }
                                                </ul>
                                              </td>
                                              <td>
                                                05/04/2020  14:45:15
                                              </td>
                                              <td className="single-champaign-action">
                                                <React.Fragment>
                                                  <OverlayTrigger
                                                    key="top"
                                                    placement="top"
                                                    overlay={
                                                      <Tooltip id={`tooltip-top-start`}>
                                                        Start Champaign
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <i className="fa fa-play" onClick={this.handleShow.bind(this,campaign.id)} aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Start Champaign"></i>
                                                  </OverlayTrigger>

                                                  <OverlayTrigger
                                                    key="top"
                                                    placement="top"
                                                    overlay={
                                                      <Tooltip id={`tooltip-top-pause`}>
                                                        Pause Champaign
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <i className="fa fa-pause-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Pause Champaign"></i>
                                                  </OverlayTrigger>

                                                  <OverlayTrigger
                                                    key="top"
                                                    placement="top"
                                                    overlay={
                                                      <Tooltip id={`tooltip-top-end`}>
                                                        End Champaign
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <i className="fa fa-stop-circle" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="End Champaign"></i>
                                                  </OverlayTrigger>

                                                </React.Fragment>
                                              </td>
                                          </tr>
                                        )
                                      }) : (
                                        <tr><td colSpan={5}>No campaigns found. Please create new.</td></tr>
                                      )
                                    }
                                </tbody>
                            </table>

                            <div className="pagination-content-bar mb-3">
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
                            </div>
                          </React.Fragment>
                        )
                      }
                  </div>
            </div>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Enter Linkedin cookie ("li_at")</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" name="linkedin_cookie" className="form-control" id="email-address" value={this.state.linkedin_cookie} onChange={this.fieldValChange} required />
              <span className="help-cookie"><a href="https://support.phantombuster.com/hc/en-001/articles/360007071719-How-to-get-your-cookies-with-Phantombuster" target="_blank">How to get your cookies manually?</a></span>
              <span>{this.state.errorMsg}</span>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                Close
              </Button>
              <Button variant="primary" onClick={this.campaignPlay.bind(this)}>
                Campaign Play
              </Button>
            </Modal.Footer>
          </Modal>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
    selectedCampaigns: state.selectedCampaigns,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaigns: (url) => dispatch(getCampaigns(url)),
    selectCampaign: (data) => dispatch(selectCampaign(data)),
    applyAction: (action, ids) => dispatch(applyAction(action, ids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
