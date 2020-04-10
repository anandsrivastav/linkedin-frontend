import React,{Component} from 'react';
import  TemplateForm from './TemplateForm';

export default class CreateTemplate extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div className="container mt-4">
			    Create New Template
			    <TemplateForm />
			 </div>
		)
	}
} 