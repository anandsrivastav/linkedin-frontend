import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import CampaignDashboard from './containers/Campaign/Dashboard';
import CampaignPlay from './containers/Campaign/CampaignPlay';
import CampaignForm from './containers/Campaign/Form';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginForm from './containers/Login/LoginForm';
import PasswordReset from './containers/Password/Reset';
import PasswordRecovery from './containers/Password/Recovery';
import Template from './containers/Template/index';
import CreateTemplate from './containers/Template/CreateTemplate';
import UpdateTemplate from './containers/Template/UpdateTemplate';
import RecoveryConfirmation from './containers/Password/Confirm';
import SingupForm from './containers/Signup/Form';
import NoRouteFound from './components/NoRoute/NoRoute';
import './App.css';
import './assets/common.css';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <div className="app-frame">{this.props.children}</div>
    )
  }
}


function PublicOnlyRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (!authed || (authed === false))
        ? <Component {...props} />
        : <Redirect to={{pathname: '/campaign', state: {from: props.location}}} />}
    />
  )
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.accessToken
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

const App = class App extends Component {

  componentDidMount() {
    if(this.props.match.url === '/') {
      localStorage.removeItem('marketPlace')
    }
  }

  render() {
    let { location, history, auth } = this.props;

    return (
      <ScrollToTop location={this.props.location}>
          <Header />
          <Switch>
            <Route exact location={this.props.location} path="/" render={(props) => (
              <LoginForm history={this.props.history} authed={auth.isAuthenticated} location={this.props.location} exact />
            )}/>
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/confirm/:token" exact component={RecoveryConfirmation} />
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/recover" exact component={PasswordRecovery} />
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/signup" exact component={SingupForm} />
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/password-reset" exact component={PasswordReset} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaign" exact component={CampaignDashboard} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaign/new" exact component={CampaignForm} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/campaign/play/:id" exact component={CampaignPlay} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/templates" exact component={Template} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/templates/new" exact component={CreateTemplate} />
            <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/templates/update/:id" exact component={UpdateTemplate} /> 
            <Route component={NoRouteFound} />
          </Switch>
          <Footer />
      </ScrollToTop>
    )
  }

// )
}

function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(App);
