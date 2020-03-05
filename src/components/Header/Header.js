import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

class Header extends Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { auth } = this.props;
    
    return (
        <header>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#"><span className="logo-text">Oak Tree Cloud</span></a>
                
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="nav navbar-nav ">
                            {
                              auth.isAuthenticated ? (
                                <React.Fragment>
                                  <li className="nav-item active">
                                      <a className="nav-link" href="/">Campaign <span className="sr-only">(current)</span></a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link" href="/">Dashboard</a>
                                  </li>
                                  <li className="nav-item">
                                      <a className="nav-link" href="#">Message</a>
                                  </li>                                
                                </React.Fragment>
                              ) : null
                            }

                        </ul>

                        <ul className="nav navbar-nav ml-auto">
                            {
                              auth.isAuthenticated ? (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Admin
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#"><i className="fa fa-user" aria-hidden="true"></i> Profile</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> logout</a>
                                    </div>
                                </li>
                              ) : (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Actions
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="/"><i className="fa fa-user" aria-hidden="true"></i> Login</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/signup"> <i className="fa fa-sign-out" aria-hidden="true"></i> Signup</a>
                                    </div>
                                </li>
                              )
                            }
                        </ul>

                    </div>
                </div>
              </nav>
        </header>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);