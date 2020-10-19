import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from '../../userProfile/staff/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginModal from '../../userProfile/staff/signin';
import Logout from '../../userProfile/staff/logout';
import MainPageLayout from './signInStaff';
import StaffLayout from '../staffLayout/staffLayout';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
class AppNavbar extends Component{
    state = {
        isOpen : false
    }

    static propTypes = {
        auth : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    

    render()
    {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <Fragment>
               
               
               <Router>
                    <div className="App-intro">
                        <Switch>
                            {/* <Route path="/dashboard" component={RaLayout} user={user}/> */}
                            <Route path="/dashboard" render={(props) => ( <StaffLayout {...props} user={user} />)}/>
                            <Redirect to="/dashboard" />
                        </Switch>
                    </div>
                </Router>
                
                   
                
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
               < MainPageLayout/>
            </Fragment>
        );
        return (
            <div>
          
               
                
                    
                    { isAuthenticated ? authLinks : guestLinks }
                    
                
               
           
            
            </div>
        );
}
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);