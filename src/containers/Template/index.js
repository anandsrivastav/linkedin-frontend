import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTemplates, selectTemplate } from '../../actions/templateActions';

class Index extends Component {

   componentDidMount() {
      this.props.getTemplates()
   }
   
   selectTemplate = (template, e) => {
      e.preventDefault();
      this.props.selectTemplate(template)
      this.props.history.push('/campaign/new')
   }


   render() {
        const { templates } = this.props;
        return (
            <main>
                <div className="container">
                    <div className="row">
                        <h1 className="temp-head">Select a template</h1>
                        <hr className="my-4" />
                        <p>Scroll through the available templates until you find one you’d like to use. Once you find a template you wish to use, simply click on the thumbnail to apply it on your campaign.</p>
                        {
                            (templates.length > 0) ? (templates.map(template => {
                                return(
                                  <div className="col-md-6 template-box" key={template.id}>
                                    <Link to="#" onClick={this.selectTemplate.bind(this, template)}>
                                      <div className="container">
                                          <div className="row">
                                              <div className="col-md-8">
                                                  <div className="add-new-campaign-box-container">
                                                      <form>
                                                          <div className="card mb-3 mt-3">
                                                              <div className="card-body">
                                                                  <div className="add-campaign-upper-section">
                                                                      <div className="form-group">
                                                                          <input type="text" className="form-control" name="campaignUrl" value={template.title} placeholder="Campaign URL" required/>
                                                                      </div>
                                                                      <div className="form-group">
                                                                          <textarea className="form-control" name="campaignMessage" value={template.description} placeholder="Campaign Message" required>
                                                                          </textarea>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          

                                                          <div className="d-flex justify-content-end">
                                                              <button type="button" name="add-new-campaign-button" id="add-new-campaign-button" className="btn btn-dark mb-3"><i className="fa fa-plus-circle ml-auto" aria-hidden="true"></i> Add Follow Up</button>
                                                          </div>

                                                          <div className="dynamic-add-campaign-add-follow-up-section" id="dynamic-add-campaign-add-follow-up-section">
                                                              <div className="card mb-3">
                                                                  <div className="card-body">
                                                                      <div className="card-header">
                                                                          <i className="fa fa-times-circle d-flex justify-content-end" aria-hidden="true"></i>
                                                                        </div>
                                                                      <div className="form-group">
                                                                          <label htmlFor="follow-up-after">Follow Up After</label>
                                                                          <input type="number" value={template.follow_up_days} className="form-control" name="followupDays" placeholder="1" required />
                                                                          <small id="follow-up-after-help" className="form-text text-muted">Days</small>
                                                                      </div>
                                                                      <div className="form-group">
                                                                          <label htmlFor="campaign-message">Follow Up Message</label>
                                                                          <textarea className="form-control" value={template.follow_up_message} name="message" placeholder="Follow Up Message" required>
                                                                          </textarea>
                                                                      </div>                                
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="save-cancel-button-container">
                                                              <button type="submit" name="save-new-campaign-button" className="btn btn-dark mb-3">Save</button> <button type="cancel" name="cancel-new-campaign-button" className="btn btn-dark mb-3">Cancel</button>
                                                          </div>
                                                      </form>
                                                  </div>
                                              </div>
                                              <div className="col-md-4">
                                              </div>
                                          </div>
                                      </div>
                                    </Link>
                                  </div>
                                )
                            })) : <p>No templates found.</p>
                        }
                    </div>
                </div>
            </main>
        )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTemplates: () => dispatch(fetchTemplates()),
    selectTemplate: (template) => dispatch(selectTemplate(template))
  };
};

const mapStateToProps = (state) => {
    return {
      templates: state.templates
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);