import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container, Row, Col, Figure, FigureImage, FigureCaption } from 'react-bootstrap';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../restaurantAdmin/profile/raprofile.css';

class SProfile extends React.Component {

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
        await fetch("http://localhost:4000/staff/viewprofile/" + this.state.user.id + "", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => pointerToThis.setState({ user: data }));
        var body = JSON.stringify({ wid: this.state.user.id });
        await fetch("http://localhost:4000/staff/restaurant/findstaff/", {
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
                            <div>
                                <Avatar size={256} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                                <i class="material-icons" >edit</i>
                            </div>
                            <br></br>
                            <div style={{alignContent: 'space-between' }} class="d-flex ">
                                <div>
                                    <p>{this.state.user.username}  </p>
                                    <p>Name: {this.state.user.name}  </p>
                                    <p>Phone Number: {this.state.user.phonenumber}  </p>
                                    <p>Email: {this.state.user.email}  </p>
                                </div>
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

export default connect(mapStateToProps, null)(SProfile);