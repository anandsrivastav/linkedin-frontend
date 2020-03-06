import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCampaigns, selectCampaign, submitCampaign } from '../../actions/campaignActions';
import FollowUp from '../../components/FollowUp/FollowUp';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignUrl: '',
      campaignMessage: '',
      followUpsCount: 0,
      followUpsData: []
    }
  }

  addFolloup = (e) => {
    e.preventDefault();
    const data = {
      followupDays: 1,
      message: ''
    }

    let newState = Object.assign(this.state);
    newState.followUpsCount = newState.followUpsCount + 1
    newState.followUpsData.push(data)
    this.setState(newState)
  }

  removeFolloup = (index, e) => {
    e.preventDefault();
    let newState = Object.assign(this.state);
    newState.followUpsData.splice(index, 1)
    newState.followUpsCount = newState.followUpsData.length
    this.setState(newState)
  }

  goSubmit = (e) => {
    e.preventDefault();
    console.log(this);
    const { followUpsData, campaignMessage, campaignUrl } = this.state;
    const campaignData = {
      followUpsData,
      description: campaignMessage, 
      url: campaignUrl
    }
    this.props.submitCampaign(campaignData)
    .then((res) => {
      if(res.data.status === 200) {
        this.props.history.push('/campaign')
      } else {
        this.setState({
          error: "something went wrong."
        })
      }
    })
  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  handleValueChange = (index, e) => {
    let newState = Object.assign(this.state);
    let currentFollowUp = newState.followUpsData[index]
    currentFollowUp[e.target.name] = e.target.value
    this.setState(newState);
  }

  render() {
    const { followUpsCount, followUpsData } = this.state;
    const followUpAry = Array(followUpsCount).fill(0).map((x, y) => x + y)
    return (
      <main>
          <div className="container">
              <div className="row">
                  <div className="col-md-8">
                      <div className="add-new-campaign-box-container">
                          <form>
                              <div className="card mb-3 mt-3">
                                  <div className="card-body">
                                      <div className="add-campaign-upper-section">
                                          <div className="form-group">
                                              <input type="text" className="form-control" name="campaignUrl" onChange={this.onChange} placeholder="Campaign URL" required/>
                                          </div>
                                          <div className="form-group">
                                              <textarea className="form-control" name="campaignMessage" onChange={this.onChange} placeholder="Campaign Message" required>
                                              </textarea>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              

                              <div className="d-flex justify-content-end">
                                  <button type="button" name="add-new-campaign-button"  onClick={this.addFolloup} id="add-new-campaign-button" className="btn btn-dark mb-3"><i className="fa fa-plus-circle ml-auto" aria-hidden="true"></i> Add Follow Up</button>
                              </div>

                              {
                                followUpAry.map((val, index) => {
                                  return <FollowUp key={val} index={val} removeFolloup={this.removeFolloup.bind(this, val)} data={followUpsData[val]} handleValueChange={this.handleValueChange}/>
                                })
                              }

                              <div className="save-cancel-button-container">
                                  <button type="submit" name="save-new-campaign-button" onClick={this.goSubmit} className="btn btn-dark mb-3">Save</button> <button type="cancel" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/')} className="btn btn-dark mb-3">Cancel</button>
                              </div>
                          </form>
                      </div>
                  </div>
                  <div className="col-md-4">

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
    submitCampaign: (data) => dispatch(submitCampaign(data)),
    selectCampaign: (data) => dispatch(selectCampaign(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
