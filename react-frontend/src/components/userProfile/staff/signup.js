import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap'; 
import {
  Alert
} from 'reactstrap';
import '../../superAdmin/restaurant/addrestaurant.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../flux/actions/staff/authActions';
import { clearErrors } from '../../../flux/actions/staff/errorActions';

class RegisterModal extends Component {
    state = {
        username : '',
        name : '',
        email : '',
        phonenumber : '',
        password : '',
        msg : null
    }

  static propTypes = {
      isAuthenticated : PropTypes.bool,
      error : PropTypes.object.isRequired,
      register : PropTypes.func.isRequired,
      clearErrors : PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const{ error, isAuthenticated } = this.props;
    if(error !== prevProps.error)
    {
      //check for register error
      if(error.id === 'REGISTER_FAIL'){
        this.setState({ msg : error.msg.msg })
      }
      else
      {
        this.setState({ msg : "success" })
      }
    }
    

  }

  onChange = e => {
      this.setState({ [e.target.name] : e.target.value });
  };

  onSubmit = async (e) => {
      e.preventDefault();
      const { name, username, email, phonenumber, password } = this.state;
      //create user object
      const newUser = {
        name,
        username,
        email,
        phonenumber,
        password,
      };
      //Attempt to register
      this.props.register(newUser);
      // window.location.reload();
  }


  render(){
    return (
      <div>
        {this.state.msg ? <Alert color="success">{ this.state.msg }</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <Form.Group >
            <Form.Label>Restaurant details</Form.Label>
            <center>
            <Form.Control type="text" name="name" id="name" ref="name" onChange={this.onChange} placeholder="Enter name of waiter" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="text" name="username" id="username" ref="username" onChange={this.onChange} placeholder="Enter username of waiter" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="email" name="email" id="email" ref="email" onChange={this.onChange} placeholder="Enter email of waiter" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="text" name="phonenumber" id="phonenumber" ref="phonenumber" onChange={this.onChange} placeholder="Enter phonenumber of waiter" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Form.Group >
            <center>
            <Form.Control type="password" name="password" id="password" ref="password" onChange={this.onChange} placeholder="Enter password of waiter" size="sm" style={{width:"90%", color:"black", backgroundColor:"transparent",border:"1px solid black"}}/>
            </center>
          </Form.Group>
          <Button className="butn" type="submit">Sign Up</Button>
        </Form>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors }
)(RegisterModal);

