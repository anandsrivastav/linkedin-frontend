import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/signupActions'
import { Alert, Toast } from 'react-bootstrap';
import Loader from '../../components/Loader/Loader';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      company: '',
      email: '',
      password: ''
    }
  }

  handleFieldChange = (e) => {
    this.setState({[e.target.name] : e.target.value })
  }

  hideSuccess = () => {
    this.setState({success: null})
  }

  hideError = () => {
    this.setState({error: null})
  }

  onChange = (e) => {
    if(e.target.value !== this.state.password) {
      e.target.setCustomValidity("Password confirmation value doesn't match.");
    } else {
      e.target.setCustomValidity("");
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    const { firstname, lastname, company, email, password } = this.state;
    const data = {
      firstname,
      lastname, 
      company, 
      email, 
      password
    }
    this.props.registerUser(data)
    .then((res) => {
      if(res.data.user) {
        this.setState({ success: res.data.message, error: ''})
      } else {
        this.setState({error: res.data.message, success: ''})
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    const { error, success } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="container">
          <div className="row">
              <div className="col-md-12">
                  <div className="card">
                      <div className="card-body">
                          <div className="row">
                              <div className="col-md-3">                              
                              </div>
                              <div className="col-md-6">
                                <form onSubmit={this.submitForm}>
                                    <h3 className="text-center">Sign Up</h3>
                                    <p className="text-center">Please fill in this form to create an account</p>
                                    <div>
                                        <button className="btn btn-dark btn-block mb-1">Sign Up with Google</button>
                                    </div>
                                    <div>
                                        <button className="btn btn-dark btn-block mb-3">Sign Up with LinkedIn</button>
                                    </div>

                                    { success ? (
                                      <Toast onClose={this.hideSuccess}>
                                        <Toast.Header>
                                          <strong className="mr-auto">Sucess</strong>
                                        </Toast.Header>
                                        <Toast.Body>
                                          <Alert variant="success">
                                            {success}
                                          </Alert>
                                        </Toast.Body>
                                      </Toast>
                                    ) : null }

                                    { error ? (
                                      <Toast onClose={this.hideError}>
                                        <Toast.Header>
                                          <strong className="mr-auto">Sucess</strong>
                                        </Toast.Header>
                                        <Toast.Body>
                                          <Alert variant="danger">
                                            {error}                                              
                                          </Alert>
                                        </Toast.Body>
                                      </Toast>                                       
                                      ) : null }

                                    {
                                      isLoading ? (
                                        <Loader loading={true} />
                                      ) : (
                                        <div className="form-row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label for="first-name">First Name</label>
                                                    <input type="text" className="form-control" name="firstname" id="first-name" onChange={this.handleFieldChange} aria-describedby="FirstNameHelp" required />
                                                </div>
                                            </div>
                                            <div className="col-md-6">                                             
                                                <div className="form-group">
                                                    <label for="last-name">Last Name</label>
                                                    <input type="text" className="form-control" name="lastname" id="last-name" onChange={this.handleFieldChange} aria-describedby="LastNameHelp" required />
                                                </div>  
                                            </div>
                                        </div>
                                      )
                                    }

                                    <div className="form-group">
                                        <label for="company-name">Company Name</label>
                                        <input type="text" className="form-control" name="company" id="company-name" onChange={this.handleFieldChange} aria-describedby="CompanyNameHelp" />
                                    </div>     
                       
                                    <div className="form-group">
                                        <label for="email-address">Email address</label>
                                        <input type="email" className="form-control" name="email" id="email-address" onChange={this.handleFieldChange} aria-describedby="EmailHelp" required />
                                    </div>


                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="password">Password</label>
                                                <input type="password" name="password" className="form-control" id="password" onChange={this.handleFieldChange} aria-describedby="PasswordHelp" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label for="confirm-password">Confirm Password</label>
                                                <input type="password" name="password-confirmation" onChange={this.onChange} className="form-control" id="confirm-password" aria-describedby="ConfirmPasswordHelp" required />
                                            </div>

                                        </div>  
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
                                    </div>
                                </form>

                                <div className="mt-3">
                                    <p className="text-center">Already have an account? <a href="/">Login Here</a></p>
                                </div>

                              </div>
                              <div className="col-md-3">
                              
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data) => dispatch(register(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);