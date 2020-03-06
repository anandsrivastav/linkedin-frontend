import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

  render() {
    return (
        <footer className="fixed-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">

                    </div>
                    <div className="col-md-4">

                    </div>                
                </div>
            </div>
            <div className="footer-bottom-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="copyright-text text-center">&copy; Copyright 2020. Oak Tree Cloud. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
  }
}

export default Footer;