import React,{Component} from 'react';
import  TemplateForm from './TemplateForm';

export default class  UpateTemplate extends Component {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
			 i M Updtae

			 <TemplateForm history={this.props.history} location={this.props.location}/>
			 </div>
		)
	}
} 