import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import signin from '../../userProfile/restaurantAdmin/signin';
import { Button } from 'react-bootstrap';
import RaLayout from '../restaurantAdminLayout/restaurantadminlayout';

class MainPageLayout extends React.Component{
    state = {
        isOpen : false
    }
    static propTypes = {
        auth : PropTypes.object.isRequired,
        // isAuthenticated : PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    render()
    {
        return(
            <div>
                <Router>
                    <Link className="link" to="/signin" >Login</Link>
                    <div className="App-intro">
                        <Switch>
                            <Route path="/signin" component={signin}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });
  
  
  export default connect(mapStateToProps, null)(MainPageLayout);