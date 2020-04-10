import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveTemplate,fetchTemplate,updateTemplate } from '../../actions/templateActions';
import Loader from '../../components/Loader/Loader';
import {NotificationManager} from 'react-notifications';

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
		if(e.target.name === "template_type"){
	        data.template_subject = ''
		} 
		data[e.target.name] = e.target.value
		this.setState({data: data})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if(this.props.fromUpdate){
			let dataToSend = this.state.data
			dataToSend.id = this.props.location.state.templateId
			this.props.updateTemplate(dataToSend).then(
			() => {
			    NotificationManager.success('Template Updated', 'Updated');
				this.props.history.push('/templates')
	     	})
		}
		else{
			this.props.saveTemplate(this.state.data).then(
			() => {
				NotificationManager.success('Template Created', 'Created');
				this.props.history.push('/templates')
			})
		}
		
	}

	componentDidMount = () => {
		let that = this
		if(this.props.fromUpdate){
			this.props.fetchTemplate(this.props.location.state.templateId).then(
				(res) => {
					that.setState({data: res})
				})
		}
	}

	render(){
		let {data} = this.state
		let {isLoading,fromUpdate} = this.props
		return(
			<div>
			  {isLoading ? 
			  	 <Loader loading={true} /> 
			       :
			        <form>
	                  <div className="card mb-3 mt-3">
	                      <div className="card-body">
	                          <div className="add-campaign-upper-section">
	                              <div className="form-group row">
	                                  <label htmlFor="template_type" className="col-sm-3">Template Type</label>
	                                  <select className="form-control col-sm-3" onChange={this.onChange}  value={data.template_type} name="template_type">
	                                     <option  value="normal"> Normal Tempalte </option>
	                                     <option value="linkedin"> Linkedin Tempalte </option> 
	                                  </select>
	                              </div>
	                                <div className="form-group row">
	                                      <label htmlFor="template_name" className="col-sm-3">Template Name</label>
		                                  <input type="text" className="form-control col-sm-5" name="template_name" defaultValue={data.template_name} 
		                                  onChange={this.onChange} placeholder="Tempalte Name" required/>
		                            </div>
	                              {data.template_type == 'normal' ? 

	                              <React.Fragment>

		                              <div className="form-group row">
		                                  <label htmlFor="template_subject" className="col-sm-3">Template Subject</label>
		                                  <textarea className="form-control col-sm-9" name="template_subject" defaultValue={data.template_subject} 
		                                    onChange={this.onChange} placeholder="Tempalte Subject" rows={2} required>
		                                  </textarea>
		                              </div> 
		                            </React.Fragment>  
		                            :
		                            ''
	                                 }

	                              <div className="form-group row">
	                                  <label htmlFor="body" className="col-sm-3">Template Body</label>
	                                  <textarea className="form-control col-sm-9" name="body" defaultValue={data.body} 
	                                    onChange={this.onChange} rows={10} placeholder="Tempalte Body" required>
	                                  </textarea>
	                              </div>
	                          </div>
	                      </div>
	                  </div>
	                  <div className="save-cancel-button-container">
	                      <button type="submit" name="save-new-campaign-button" onClick={this.handleSubmit} className="btn btn-dark mb-3">
	                        { fromUpdate  ? 'Update' : 'Save'}
	                        </button>
	                         &nbsp;
	                       <button type="cancel" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/templates')} className="btn btn-dark mb-3">
	                       Cancel
	                       </button>
	                  </div>
                   </form>
                  }
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
    saveTemplate: (data) => dispatch(saveTemplate(data)),
    updateTemplate: (data) => dispatch(updateTemplate(data)),
    fetchTemplate: (id) => dispatch(fetchTemplate(id))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
