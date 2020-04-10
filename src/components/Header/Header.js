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
                    <Link className="navbar-brand" to="#"><span className="logo-text">Oak Tree Cloud</span></Link>
                
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="nav navbar-nav ">
                            {
                              auth.isAuthenticated ? (
                                <React.Fragment>
                                  <li className="nav-item active">
                                      <Link className="nav-link" to="/campaign">Campaign <span className="sr-only">(current)</span></Link>
                                  </li>
                                  {<li className="nav-item active">
                                  <Link className="nav-link" to="/templates">Templates</Link>
                                  </li>}
                                </React.Fragment>
                              ) : null
                            }

                        </ul>

                        <ul className="nav navbar-nav ml-auto">
                            {
                              auth.isAuthenticated ? (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Actions
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="#"><i className="fa fa-user" aria-hidden="true"></i> Profile</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> logout</a>
                                    </div>
                                </li>
                              ) : (
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Actions
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <Link className="dropdown-item" to="/"><i className="fa fa-user" aria-hidden="true"></i> Login</Link>
                                            <div className="dropdown-divider"></div>
                                            <Link className="dropdown-item" to="/signup"> <i className="fa fa-sign-out" aria-hidden="true"></i> Signup</Link>
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