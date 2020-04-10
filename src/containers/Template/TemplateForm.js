import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveTemplate } from '../../actions/templateActions';


class TemplateForm extends Component {
	constructor(props){
		super(props)
		this.state = { 
			data: {
				template_name: '',
				template_subject: '',
				body: '',
				template_type: 'normal'
			}
		}
	}
	

	onChange =(e) => {
		let data = this.state.data
		data[e.target.name] = e.target.value
		this.setState({data: data})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.saveTemplate(this.state.data).then(
			() => this.props.history.push('/templates'))
	}

	render(){
		let {data} = this.state
		return(
			<div>
			    <form>
	                  <div className="card mb-3 mt-3">
	                      <div className="card-body">
	                          <div className="add-campaign-upper-section">
	                              <div className="form-group">
	                                  <select className="form-control" onChange={this.onChange}  defaultValue='normal' name='template_type'>
	                                     <option  value='normal'> Normal Tempalte </option>
	                                     <option value='linkedin'> Linkedin Tempalte </option> 
	                                  </select>
	                              </div>

	                                <div className="form-group">
		                                  <input type="text" className="form-control" name="template_name" defaultValue={data.template_name} 
		                                  onChange={this.onChange} placeholder="Tempalte Name" required/>
		                            </div>

	                              
	                              {data.template_type == 'normal' ? 

	                              <React.Fragment>

		                              <div className="form-group">
		                                  <textarea className="form-control" name="template_subject" defaultValue={data.template_subject} 
		                                    onChange={this.onChange} placeholder="Tempalte Subject" rows={2} required>
		                                  </textarea>
		                              </div> 
		                            </React.Fragment>  
		                            :
		                            ''
	                           }

	                              <div className="form-group">
	                                  <textarea className="form-control" name="body" defaultValue={data.body} 
	                                    onChange={this.onChange} rows={10} placeholder="Tempalte Body" required>
	                                  </textarea>
	                              </div>
	                          </div>
	                      </div>
	                  </div>




	                  <div className="save-cancel-button-container">
	                      <button type="submit" name="save-new-campaign-button" onClick={this.handleSubmit} className="btn btn-dark mb-3">
	                        Save
	                        </button>
	                         &nbsp;
	                       <button type="cancel" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/')} className="btn btn-dark mb-3">
	                       Cancel
	                       </button>
	                  </div>
                   </form>
			 </div>
		)
	}
} 


const mapStateToProps = (state) => {
  return {
    campaigns: state.campaigns,
    template: state.template,
    selectedCampaigns: state.selectedCampaigns,
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTemplate: (data) => dispatch(saveTemplate(data))  
}
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
