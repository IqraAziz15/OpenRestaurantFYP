import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container, Row, Col, Figure, FigureImage, FigureCaption } from 'react-bootstrap';
import { Avatar } from 'antd';
import {Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'material-design-icons/iconfont/material-icons.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../restaurantAdmin/profile/raprofile.css';

class WProfile extends React.Component {

    state = {
        user: this.props.user,
        rest: '',
        loading: true
    };

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
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
        var body = JSON.stringify({ wid: this.state.user.id });
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
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(WProfile);