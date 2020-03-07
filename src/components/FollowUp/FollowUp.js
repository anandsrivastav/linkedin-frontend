import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class FollowUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      message: '',
      followUps: []
    }
  }

  render() {
    const { index, removeFolloup, data, handleValueChange } = this.props;
    return (
      <div key={index} className="dynamic-add-campaign-add-follow-up-section" id="dynamic-add-campaign-add-follow-up-section">
          <div className="card mb-3">
              <div className="card-body">
                  <div className="card-header">
                      <i className="fa fa-times-circle d-flex justify-content-end" onClick={removeFolloup} aria-hidden="true"></i>
                    </div>                                        
                  <div className="form-group">
                      <label htmlFor="follow-up-after">Follow Up After</label>
                      <input type="number" value={data.followupDays} onChange={handleValueChange.bind(this, index)} className="form-control" name="followupDays" placeholder="1" required />
                      <small id="follow-up-after-help" className="form-text text-muted">Days</small>
                  </div>
                  <div className="form-group">
                      <label htmlFor="campaign-message">Follow Up Message</label>
                      <textarea className="form-control" name="message" value={data.message} onChange={handleValueChange.bind(this, index)} placeholder="Follow Up Message" required>
                      </textarea>
                  </div>                                
              </div>
          </div>
      </div>
    )
  }
}

export default FollowUp;
