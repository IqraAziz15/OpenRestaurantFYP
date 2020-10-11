import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image, Container, Row, Col, Figure, FigureImage, FigureCaption } from 'react-bootstrap';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './raprofile.css';

class RaProfile extends React.Component {

    state = {
        user: this.props.user,
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
                    
                    <div>
                        <a href="#" class="list-group-item list-group-item-action">
                            <div>
                                <Avatar size={256} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                            </div>
                            <br></br>
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                                <div>
                                    <h3>{this.state.user.username}  </h3>
                                    <h3>Name: {this.state.user.name}  </h3>
                                    <h3>Phone Number: {this.state.user.phonenumber}  </h3>
                                    <h3>Email: {this.state.user.email}  </h3>
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

export default connect(mapStateToProps, null)(RaProfile);