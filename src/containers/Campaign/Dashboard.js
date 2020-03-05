import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getCampaigns, selectCampaign } from '../../actions/campaignActions';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { arrayUpdation } from '../../utils/featuredActions';
import './_dashboard.css';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCampaigns();
  }

  handleSelect = (e) => {
    let { selectedCampaigns, selectCampaign } = this.props;
    const campaignIds = arrayUpdation(selectedCampaigns, e.target.name)
    selectCampaign(campaignIds)
  }

  render() {
    const { campaigns, selectedCampaigns } = this.props;
    return (
      <main>
          <div className="container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="add-new-campaign-bar mb-3 mt-3">
                          <a href="/campaign/new"><button className="btn btn-dark" type="button" Name="add-new-champaign">Add New Champaign</button></a>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-8">
                      <div className="campaign-status-bar mb-3">
                          <nav className="nav">
                              <a className="nav-link active" href="#">All <span>(26)</span></a>
                              <a className="nav-link" href="#">Started Campaign <span>(10)</span></a>
                              <a className="nav-link" href="#">Pause Campaign <span>(15)</span></a>
                              <a className="nav-link" href="#">Ended Campaign <span>(1)</span></a>
                          </nav>
                      </div>
                  </div>
                  <div className="col-md-4">
                      <div className="campaign-search-bar mb-3">
                          <form className="form-inline">
                              <input className="form-control mr-1" type="search" Name="search-champaign" value="" placeholder="Search Champaign" />
                              <button className="btn btn-dark" type="submit" Name="champaign-search">Search</button>
                          </form>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <div className="champaign-action-bar mb-3">
                          <form className="form-inline">
                              <select className="custom-select mr-1" id="champaign-bulk-action">
                                  <option selected>Bulk Action</option>
                                  <option value="1">Delete Champaign</option>
                                  <option value="2">Start Champaign</option>
                                  <option value="3">Pause Champaign</option>
                                  <option value="3">End Champaign</option>
                              </select>

                              <button className="btn btn-dark mr-3" type="submit" Name="champaign-bulk-action-apply">Apply</button>

                              <select className="custom-select mr-1" id="champaign-bulk-action">
                                  <option selected>All Dates</option>
                                  <option value="1">Jan 2020</option>
                                  <option value="2">Dec 2019</option>
                                  <option value="3">Nov 2019</option>
                                  <option value="3">Oct 2019</option>
                              </select>

                              <button className="btn btn-dark mr-3" type="submit" Name="champaign-filter">Filter</button>
                          </form>

                      </div>    
                  </div>
              </div>            
              <div className="row">
                  <div className="col-md-12">
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
                                campaigns.map((campaign, index) => {
                                  return campaign.campaign_messages.map((message, index) => {
                                    return(
                                      <tr key={index}>
                                          <td>
                                            <div className="form-group">
                                                <input type="checkbox" onChange={this.handleSelect} name={campaign.id} value="" selected={selectedCampaigns.includes(campaign.id)} />
                                            </div>
                                          </td>
                                          <td>
                                            {campaign.url}
                                          </td>
                                          <td>
                                            {message.description}
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
                                                <i className="fa fa-play" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Start Champaign"></i>
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
                                  })
                                })
                              }
                          </tbody>
                      </table>

                      <div className="pagination-content-bar mb-3">
                          <nav aria-label="...">
                              <ul className="pagination justify-content-end">
                                <li className="page-item disabled">
                                  <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                </li>
                                <li className="page-item active" aria-current="page"><a className="page-link" href="#">1 <span className="sr-only">(current)</span></a></li>
                                <li className="page-item">
                                  <a className="page-link" href="#">2 </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                  <a className="page-link" href="#">Next</a>
                                </li>
                              </ul>
                            </nav>
                      </div>

                  </div>
            </div>
          </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
    selectedCampaigns: state.selectedCampaigns
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCampaigns: () => dispatch(getCampaigns()),
    selectCampaign: (data) => dispatch(selectCampaign(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
