import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container, Row, Col, Figure, FigureImage, FigureCaption } from 'react-bootstrap';
import { Avatar } from 'antd';
import {Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WSettings extends React.Component {

    state = {
        user: this.props.user,
        rest:'',
        loading: true
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    changeUsername = (rid) =>
    {
        let username=this.refs.username.value;
        fetch('http://localhost:4000/waiter/setting/editusername/'+rid, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,
            })
        })
        .then(function(response) {
          if (response.ok) {
            alert('Username updated Successfully')
            window.location.reload(false);
            return true;
                } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
              }
          })
            
      } 

    changeEmail = (rid) =>
    {
        let email=this.refs.email.value;
        fetch('http://localhost:4000/waiter/setting/editemail/'+rid, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
            })
        })
        .then(function(response) {
          if (response.ok) {
            alert('Email Updated Successfully')
            window.location.reload(false);
            return true;
                } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
              }
          })
            
      } 

      changePhoneNumber = (rid) =>
      {
          let phonenumber=this.refs.phonenumber.value;
          fetch('http://localhost:4000/waiter/setting/editphonenumber/'+rid, {
              method:'PUT',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({
                phonenumber,
              })
          })
          .then(function(response) {
            if (response.ok) {
              alert('PhoneNumber Updated Successfully')
              window.location.reload(false);
              return true;
                  } else {
              var error = new Error(response.statusText)
              error.response = response
              throw error
                }
            })
              
        } 

        changePassword = (rid) =>
        {
            let password=this.refs.password.value;
            fetch('http://localhost:4000/waiter/setting/editpassword/'+rid, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    password,
                })
            })
            .then(function(response) {
              if (response.ok) {
                alert('Password Updated Successfully')
                window.location.reload(false);
                return true;
                    } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
                  }
              })
                
          } 

    componentDidMount = async () => {
        this.id = setTimeout(() => this.setState({ loading: false }), 2000)
        const pointerToThis = this;
        await fetch("http://localhost:4000/waiter/viewprofile/" + this.state.user.id + "", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ user: data }));
        var body = JSON.stringify({ rid: this.state.user.id });
        await fetch("http://localhost:4000/waiter/restaurant/findwaiter/", {
            method: 'POST',
            body,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ rest: data }));
    }

    componentWillUnmount() {
        clearTimeout(this.id)
    }

    render() {
        return (
            <div>
                 {this.state.loading ? (
                    <center>
                    <Spin
                        className="spinner"
                        tip="Loading...Please Wait"
                        size="large"
                    />
                    </center>
                ) :
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
                        <div href="#" class="list-group-item list-group-item-action">
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
                                <button type="submit" class="btn btn-dark" onClick={()=>this.changeUsername(this.props.user.id)}>Save Changes</button>
                            </div> 
                        </div>
                        <br/>
                        <div href="#" class="list-group-item list-group-item-action">
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
                                <button type="submit" class="btn btn-dark" onClick={()=>this.changeEmail(this.props.user.id)}>Save Changes</button>
                            </div> 
                        </div>
                        <br/>
                        <div href="#" class="list-group-item list-group-item-action">
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
                                <button type="submit" class="btn btn-dark" onClick={()=>this.changePhoneNumber(this.props.user.id)}>Save Changes</button>
                            </div> 
                        </div>
                        <br/>
                        <div href="#" class="list-group-item list-group-item-action">
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
                                {/* <input class="form-control" style = {{marginBottom:'0.5em'}} type="password" ref="nnpassword" name="nnpassword" placeholder="Enter new password here again" id="nnpassword"/> */}
                                <button type="submit" class="btn btn-dark"  onClick={()=>this.changePassword(this.props.user.id)}>Save Changes</button>
                            </div> 
                        </div>
                    </div>

                    

                    : ''}
                </div>
            }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(WSettings);




                            
                            