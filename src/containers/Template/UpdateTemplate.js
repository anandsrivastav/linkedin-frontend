import React,{Component} from 'react';
import  TemplateForm from './TemplateForm';

export default class  UpateTemplate extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="container mt-4">
			  Update Tempate
			 <TemplateForm history={this.props.history} location={this.props.location} fromUpdate={true}/>
			 </div>
		)
	}
} 