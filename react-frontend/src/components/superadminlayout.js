import React,{Component} from 'react';
import addrestaurant from './addrestaurant';
// import addrestaurantadmin from './addrestaurantadmin';
import viewanddeleterestaurant from './viewanddeleterestaurant';
// import logo1 from '../assets/images/logo1.png'; 
import './superadminlayout.css'; 
import { Layout, Menu,Button} from 'antd';
import { MenuOutlined} from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class SaLayout extends Component{
    constructor(){
    super()
    
};
render(){
    return(
        <Router>
            <Layout>
                <Header className="header">
                <div className="App-logo" />
            {/*       <img className="App-logo" src={logo1} alt="Logo"/>  */}
                <h3 className="App-name"><span className="open">Open </span><span className="rest">Restaurant</span></h3>
            
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                </Menu>
                </Header>
                <Layout>
                <Sider width={200} className="site-layout-background" >
                    <Menu theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                    >
                    <SubMenu key="sub1" icon={<MenuOutlined />} title="Dashboard">
                    <SubMenu key="sub2" title="Manage Restaurants">
                        <Menu.Item key="1" ><Link className="link" to="/addrestaurant" >Add Restaurant</Link></Menu.Item>
                        
                        <Menu.Item key="2"><Link className="link" to="/viewanddeleterestaurant" >View Restaurants</Link></Menu.Item>
                    {/*  <Menu.Item key="2"><Link className="link" to="/changerestaurantadmin" >Change Restaurant Admin</Link></Menu.Item> */}
 
                    </SubMenu>
                    {/* <SubMenu key="sub3" title="Settings">
                        <Menu.Item key="3" >Change username</Menu.Item>
                        <Menu.Item key="4" >Change password</Menu.Item>
                        
                    </SubMenu> */}
                    {/*  <Menu.Item key="5" >Logout</Menu.Item> */}
                    
                    </SubMenu>
                    </Menu>
                </Sider>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 800,
                    }}
                    >
                        <Switch>
                            <Route path="/addrestaurant" component={addrestaurant}/>
                            <Route path="/viewanddeleterestaurant" component={viewanddeleterestaurant}/>
                        </Switch>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center', color:"black" }}></Footer>
            </Layout>
        </Router>
        ); 

    }
}
export default SaLayout 