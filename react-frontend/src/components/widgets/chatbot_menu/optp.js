import React, {Component} from "react";
import Clayout from '../../layouts/customerLayout/customerlayout';
import {Button} from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";



class Optp extends Component{
  constructor()
  {
    super();
    this.state = {
      visible : false,
      id:'5f970dd3b6c9991dc8aabdd8',
    
    }

  }

  Load = () =>{
    this.setState({visible:true});

  }
  render(){
  //   if(this.state.visible){
  //     return <Clayout/>
  // }
  
  return (
    <div>
   

   <Router>
    <a className="link" href={`/restaurantview/${this.state.id}`} onClick={this.Load}><Button style={{backgroundColor:"transparent", color:'#F99245'}}type="primary">see menu</Button></a>
    {/* <Switch>
    <Route exact path="/restaurant/:id" component={Clayout}/>
    </Switch> */}
      </Router>
      
      </div>

      

  );
}
};

export default Optp;