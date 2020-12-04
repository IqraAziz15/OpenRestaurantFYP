import { Card, Col, Row } from 'antd';
import React,{Component} from 'react';
import "antd/dist/antd.css"; 
import "./mainlayout.css";
import AppNavbar from "../userProfileLayout/waiter";
import AppNavbar1 from "../userProfileLayout/superadmin";
import AppNavbar2 from "../userProfileLayout/restaurantadmin";
import AppNavbar3 from "../userProfileLayout/staff";

/*  import loginimage from "../../src/assets/images/loginimage.png";  */
import { Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Layout, Menu,Button} from 'antd';
import { Redirect } from 'react-router';


const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const { Meta } = Card;



class Mainlayout extends Component{
    constructor()
  {
    super();
    this.state = {
      visible : false,
      visible1 : false,
      visible2: false,
      visible3: false,
    }

  }

  Load = () =>{
    this.setState({visible:true});
  }

  Load1 = () =>{
    this.setState({visible1:true});
  }
  Load2 = () =>{
    this.setState({visible2:true});
  }
  Load3 = () =>{
    this.setState({visible3:true});
  }

render(){
    if(this.state.visible){
        return <AppNavbar1/>
    }
    else if(this.state.visible1){
        return <AppNavbar/>
    }
    else if(this.state.visible2){
        return <AppNavbar2/>
    }
    else if(this.state.visible3){
        // return <AppNavbar3/>
        return (<Router><Redirect push to = {'/staff'}/></Router>);
    }
    return(
 
 
  <div >
      <Header className="header">
      <div className="App-logo" />
      {/* <img className="App-logo" src={loginimage} alt="Logo"/> */}  
     <h3 className="App-namee"><span className="openn">Open </span><span className="restt">Restaurant</span></h3> 
  
    </Header>
    

  <div className="site-card-wrapper" hoverable size="small" style={{  alignItem: 'center' }}>
  <Row gutter={16}>
    <Col span={6}>
        
      <Card title="Login as Superadmin" bordered={true} onClick={this.Load}>
        {/*   <img  src={loginimage} alt="Login"/> */}
        <img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm5mh6MoSkaQihi-mj0XI9o40M8uAKVz-PTA&usqp=CAU" />
    
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Login as Restaurant admin" bordered={true} onClick={this.Load2}>
      <img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm5mh6MoSkaQihi-mj0XI9o40M8uAKVz-PTA&usqp=CAU" />
   
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Login as Waiter" bordered={true} onClick={this.Load1}>
      <img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm5mh6MoSkaQihi-mj0XI9o40M8uAKVz-PTA&usqp=CAU" />
    
      </Card>
    </Col>
    <Col span={6}>
      <Card title="Login as Staff member" bordered={true} onClick={this.Load3}>
      <img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSm5mh6MoSkaQihi-mj0XI9o40M8uAKVz-PTA&usqp=CAU" />
     
      </Card>
    </Col>
 
    
  </Row>
  
</div>
</div>




  


  


    );
}

}
export default Mainlayout