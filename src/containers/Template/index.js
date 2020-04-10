import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTemplates, selectTemplate } from '../../actions/templateActions';
import Loader from '../../components/Loader/Loader';

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
                 <img src="https://via.placeholder.com/200x100" />
               </th>
               <td>
               {tem.template_name}
               </td>
              <td>
               {tem.template_subject}
               </td>
              <td>
              {tem.body}
              </td>
              <td>{tem.title}</td>
              <td>
                  <Link className="nav-link" to={{pathname: `/templates/update/${tem.id}`, state: {templateId: tem.id}}}> 
                      <i className="fa fa-pencil" title='Edit'> </i>
                  </Link>
               </td>
            </tr>)
    }) 

    return(
      <table className="table">
          <thead>
            <tr>
              <th scope="col"> Thumbnail</th>
              <th scope="col">Name</th>
              <th scope="col">Subject</th>
              <th scope="col">Body</th>
              <th scope="col" >Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRows}
          </tbody>
        </table>

      )
   }


   render() {
        const { templates,isLoading } = this.props;
        return (
            <main>
            { isLoading ? 
               <Loader loading={true} /> 
                :
                <div className="container">
                    <div className="row">
                        <h1 className="temp-head">Select a template</h1>
                    </div>
                    <div className="row">
                         <div className="mt-2 mb-2">
                           <Link className="nav-link" to="/templates/new"> 
                             <button className="btn btn-info"> Create New Template</button>
                             </Link> 
                        </div>

                        <p>
                        Scroll through the available templates until you find one you’d like to use. Once you find a template you wish to use, simply 
                        click on the thumbnail to apply it on your 
                        campaign.</p>
                        {
                            this.renderTem() 
                        }
                    </div>
                </div>
              }
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
      templates: state.templates,
      isLoading: state.applicationIsLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);