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

   renderTem = () => {
    let {templates} = this.props
    let allRows = []

    let rows = templates && templates.map(tem => {
          allRows.push( 
            <tr>
              <th scope="row">
                 <img src="https://via.placeholder.com/250x100" />
               </th>
              <td>
               {tem.title}
               </td>
              <td>
              {tem.description}
              </td>
              <td>{tem.title}</td>
              <td>
                <i className="fa fa-pencil" title='Use'> </i>
               </td>
            </tr>)
    }) 

    return(
      <table className="table">
          <thead>
            <tr>
              <th scope="col">Template Thumbnail</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Body</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRows}
          </tbody>
        </table>

      )
   }


   render() {
        const { templates } = this.props;
        return (
            <main>
                <div className="container">
                    <div className="row">
                        <h1 className="temp-head">Select a template</h1>
                        <hr className="my-4" />
                        <p>
                        Scroll through the available templates until you find one you’d like to use. Once you find a template you wish to use, simply 
                        click on the thumbnail to apply it on your 
                        campaign.</p>
                        {
                            this.renderTem() 
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