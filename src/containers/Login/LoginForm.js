import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import Loader from '../../components/Loader/Loader';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    }
  }

  fieldValChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  login = (e) => {
    e.preventDefault();    
    const { email, password } = this.state;
    const userData = {
      email,
      password
    }
    this.props.userLogin(userData)
    .then((res)=> {
      if(res.status !== 200) {
        this.setState({
          error: res.data.error.user_authentication
        })
      }
    })
  }

  render() {
    const { email, password, error } = this.state;
    const { isLoading } = this.props;
    if(localStorage.accessToken) {
      this.props.history.push('/campaign')
    }

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
                                  {
                                    isLoading ? (
                                      <Loader loading={true} />
                                    ) : (
                                      <form onSubmit={this.login}>
                                          <h3 className="text-center">Sign In</h3>
                                          <p className="text-center">Please fill in this form to Login on account</p>
                                          <div>
                                              <button className="btn btn-dark btn-block mb-1">Sign Up with Google</button>
                                          </div>
                                          <div>
                                              <button className="btn btn-dark btn-block mb-3">Sign Up with LinkedIn</button>
                                          </div>

                                          { error ? (
                                            <div className="alert alert-danger" role="alert">
                                              {error}
                                            </div>
                                            ) : null}

                                          <div className="form-group">
                                              <label htmlFor="email-address">Email address</label>
                                              <input type="email" name="email" className="form-control" id="email-address" value={email} onChange={this.fieldValChange} aria-describedby="EmailHelp" required />
                                          </div>


                                          <div className="form-row">
                                              <div className="col-md-12">
                                                  <div className="form-group">
                                                      <label htmlFor="password">Password</label>
                                                      <input type="password" name="password" className="form-control" id="password" value={password} onChange={this.fieldValChange} aria-describedby="PasswordHelp" required />
                                                  </div>
                                              </div>
                                          </div>
                                          <div>
                                              <button type="submit" className="btn btn-dark btn-block">Sign In</button>
                                          </div>
                                      </form>
                                    )
                                  }

                                  <div className="mt-3">
                                      <p className="text-center"><a href="#">Forget your password?</a></p>
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
    userLogin: (data) => dispatch(login(data))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);