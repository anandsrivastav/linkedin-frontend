import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTemplates } from '../../actions/templateActions';

class Index extends Component {

   componentDidMount() {
        this.props.getTemplates()
   }

   render() {
        const { templates } = this.props;

        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Please choose one of the templates to go ahead.</h3>
                        </div>
                        {
                            (templates.length > 0) ? (templates.map(template => {
                                                            return(
                                                                <div className="col-md-6 template-box" key={template.id}>
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
                                                                                          <button type="button" name="add-new-campaign-button" id="add-new-campaign-button" className="btn btn-dark mb-3"><i className="fa fa-plus-circle ml-auto" aria-hidden="true"></i> Add Follow Up</button>
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
    getTemplates: () => dispatch(fetchTemplates())
  };
};

const mapStateToProps = (state) => {
    return {
        templates: state.templates
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);