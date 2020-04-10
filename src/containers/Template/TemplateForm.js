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
			},
			errors: {
			    template_name: '',
				template_subject: '',
				body: '',
				template_type: ''	
			},
			submittedOnce: false
		}
	}


	checkEmpty = (dataToCheck) => {
		let {data,errors} = this.state
		let stopApicall = false

		for (var key in dataToCheck) {
				if(dataToCheck && dataToCheck[key].length == 0){
					errors[key] = "Field can't be blank"
					this.setState({errors})
					stopApicall = true
				}
				else{
					errors[key] = ""
					this.setState({errors})
				}
			}

	return stopApicall
	}
	

	onChange =(e) => {
		let {data,errors} = this.state
		if(e.target.name === "template_type"){
	        data.template_subject = ''
		} 
		data[e.target.name] = e.target.value
		this.checkEmpty(data)
		this.setState({data: data})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.setState({submittedOnce: true})
		let stopApicall = false;

		let {data,errors} = this.state

		if(this.props.fromUpdate){
			let dataToSend = data
			dataToSend.id = this.props.location.state.templateId
			let stopApicall = this.checkEmpty(dataToSend)
			!stopApicall && this.props.updateTemplate(dataToSend).then(
			() => {
			    NotificationManager.success('Template Updated', 'Updated');
				this.props.history.push('/templates')
	     	})
		}
		else{
			let dataToSend = data
		    let stopApicall = this.checkEmpty(dataToSend)
			!stopApicall && this.props.saveTemplate(dataToSend).then(
			() => {
				NotificationManager.success('Template Created', 'Created');
				this.props.history.push('/templates')
			})
		}
		
	}

	componentDidMount = () => {
		if(this.props.fromUpdate){
			this.props.fetchTemplate(this.props.location.state.templateId).then(
				(res) => {
					let dataFetched = {}
					dataFetched.template_name = res.template_name || ''
					dataFetched.template_subject = res.template_subject || ''
					dataFetched.body = res.body || ''
					dataFetched.template_type = res.template_type || 'normal'
					this.setState({data: dataFetched,submittedOnce: true})
				})
		}
	}

	render(){
		let {data,errors,submittedOnce} = this.state
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
	                                  <label htmlFor="template_type" className="col-sm-3"> Type</label>
	                                  <select className="form-control col-sm-3" onChange={this.onChange}  value={data.template_type} name="template_type">
	                                     <option  value="normal"> Normal Tempalte </option>
	                                     <option value="linkedin"> Linkedin Tempalte </option> 
	                                  </select>
	                              </div>
	                                <div className="form-group row">
	                                      <label htmlFor="template_name" className="col-sm-3"> Name</label>
		                                  <input type="text" className="form-control col-sm-5" name="template_name" defaultValue={data.template_name} 
		                                  onChange={this.onChange} placeholder="Tempalte Name" 
		                                  required/>
		                                                             
		                            </div>
		                            <div className="row"> 
		                              <div className="col-sm-3"> </div>
		                             <span className="error_template_form">{submittedOnce && errors.template_name.length > 0 ? 
		                             	   errors.template_name: ''}
		                             	   </span>
		                            </div>

	                              {data.template_type == 'normal' ? 

	                              <React.Fragment>

		                              <div className="form-group row">
		                                  <label htmlFor="template_subject" className="col-sm-3"> Subject</label>
		                                  <textarea className="form-control col-sm-9" name="template_subject" defaultValue={data.template_subject} 
		                                    onChange={this.onChange} placeholder="Tempalte Subject" rows={2} required>
		                                  </textarea>
		                              </div>
		                              <div className="row"> 
				                              <div className="col-sm-3"> </div>
				                             <span className="error_template_form">{submittedOnce && errors.template_subject.length > 0 ? 
				                             	   errors.template_subject: ''}
				                             	   </span>
				                            </div> 
		                            </React.Fragment>  
		                            :
		                            ''
	                                 }

	                              <div className="form-group row">
	                                  <label htmlFor="body" className="col-sm-3"> Body</label>
	                                  <textarea className="form-control col-sm-9" name="body" defaultValue={data.body} 
	                                    onChange={this.onChange} rows={10} placeholder="Tempalte Body" required>
	                                  </textarea>
	                              </div>
	                              <div className="row"> 
				                              <div className="col-sm-3"> </div>
				                             <span className="error_template_form">{submittedOnce && errors.body.length > 0 ? 
				                             	   errors.body: ''}
				                             	   </span>
				                        </div>
	                          </div>
	                      </div>
	                  </div>
	                  <div className="save-cancel-button-container">
	                      <button 
	                          type="submit" 
	                          name="save-new-campaign-button" 
	                          onClick={this.handleSubmit} 
	                          className="btn btn-dark mb-3">
	                        { fromUpdate  ? 'Update' : 'Save'}
	                        </button>
	                         &nbsp;
	                       <button type="reset" name="cancel-new-campaign-button" onClick={(e) => this.props.history.push('/templates')} className="btn btn-dark mb-3">
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
