import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizeToken } from '../../actions/authActions';
import { Alert, Toast } from 'react-bootstrap';

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    const { authorizeToken } = this.props;
    authorizeToken(token)
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err.response.data)
    })
  }

  render() {
    const { error } = this.state;
    return (
      <div className="row">
          <div className="col-md-12">
              <div className="card">
                  <div className="card-body">
                      <div className="row">
                          <div className="col-md-3"></div>
                          <p>{error}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    authorizeToken: (data) => dispatch(authorizeToken(data))
  };
};

export default connect(null, mapDispatchToProps)(Confirm);