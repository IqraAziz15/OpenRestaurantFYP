import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container, Row, Col, Figure, FigureImage, FigureCaption } from 'react-bootstrap';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RaSettings extends React.Component {

    state = {
        user: this.props.user,
        rest: ''
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount = async () => {
        const pointerToThis = this;
        await fetch("http://localhost:4000/superadmin/restaurantadmin/adminrestaurant/" + this.state.user.id + "", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ user: data }));
        var body = JSON.stringify({ rid: this.state.user.id });
        await fetch("http://localhost:4000/restaurantadmin/restaurant/findrestaurant/", {
            method: 'POST',
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ rest: data }));
    }

    render() {
        return (
            <div>
                {this.state.user ?                  
                    <div style={{ padding: '1.5em'}}>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Name: </b>{this.state.user.name}  </p>
                                </div>
                            </div>
                        </a>
                        <br/>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b> Username: </b> {this.state.user.username}  </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <div class = "form-group">
                                <input class="form-control" style = {{marginBottom:'0.5em'}} type="text" ref="username" name="username" placeholder="Enter new username here" id="username"/>
                                <button type="submit" class="btn btn-dark" >Save Changes</button>
                            </div> 
                        </a>
                        <br/>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Email: </b>{this.state.user.email}  </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <div class = "form-group">
                                <input class="form-control" style = {{marginBottom:'0.5em'}} type="text" ref="email" name="email" placeholder="Enter new email here" id="email"/>
                                <button type="submit" class="btn btn-dark" >Save Changes</button>
                            </div> 
                        </a>
                        <br/>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Phone Number: </b>{this.state.user.phonenumber}  </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <div class = "form-group">
                                <input class="form-control" style = {{marginBottom:'0.5em'}} type="text" ref="phonenumber" name="phonenumber" placeholder="Enter new phonenumber here" id="phonenumber"/>
                                <button type="submit" class="btn btn-dark" >Save Changes</button>
                            </div> 
                        </a>
                        <br/>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                                <div>
                                    <p><b>Password: </b> </p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                    <i class="material-icons" style={{marginRight: '40px' }} >edit</i>
                                </div>
                            </div>
                            <div class = "form-group">
                                <input class="form-control" style = {{marginBottom:'0.5em'}} type="password" ref="password" name="password" placeholder="Enter previous password here" id="password"/>
                                <input class="form-control" style = {{marginBottom:'0.5em'}} type="password" ref="npassword" name="npassword" placeholder="Enter new password here" id="npassword"/>
                                <input class="form-control" style = {{marginBottom:'0.5em'}} type="password" ref="nnpassword" name="nnpassword" placeholder="Enter new password here again" id="nnpassword"/>
                                <button type="submit" class="btn btn-dark" >Save Changes</button>
                            </div> 
                        </a>
                    </div>

                    

                    : ''}



            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(RaSettings);




                            
                            