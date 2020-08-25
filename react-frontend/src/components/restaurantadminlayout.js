import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, PageHeader, Typography } from 'antd';
import {
    LogoutOutlined,
    SettingOutlined,
    FormOutlined,
    TeamOutlined,
    UserOutlined,
    DatabaseOutlined,
    AppstoreOutlined,
    ProfileOutlined,
    ContainerOutlined,
    AppstoreAddOutlined,
    FileAddOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import { Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import additem from './additems';
import viewanddeleteitem from './viewanddeleteitem';
import './restaurantadminlayout.css';
import logo from '../assets/images/logo.png';
import Title from 'antd/lib/skeleton/Title';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

class RaLayout extends React.Component
{
    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
    
      render() {
        return (
            <div>
                <Header>
                <h2 style={{color: 'white'}}>Open Restaurant</h2>
                {/* <img src= { logo } height = "45" width = "45"></img> */}
                   
                    
                </Header>
                <Router>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys={['1']}>
                        
                        <Menu.Item key="1" icon={<UserOutlined />}> User Profile</Menu.Item>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Restaurant Team">
                            <Menu.Item key="2" icon={<UserOutlined />}>Waiter</Menu.Item>
                            <Menu.Item key="3" icon={<UserOutlined />}>Staff</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<FormOutlined />} title="Restaurant Work">
                            <SubMenu key="sub4" title="Restaurant Menu" icon={<DatabaseOutlined />}>
                                <Menu.Item key="4" icon={<FileAddOutlined />}><Link className="link" to="/additem">
                                Add Menu
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="5" icon={<ContainerOutlined />}><Link className="link" to="/viewanddeleteitem">
                                View Menu
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                            {/* <SubMenu key="sub5" title="Restaurant Deals"  icon={<AppstoreOutlined />}>
                                <Menu.Item key="6" icon={<AppstoreAddOutlined />}>
                                Add Deals
                                </Menu.Item>
                                <Menu.Item key="7" icon={<WindowsOutlined />}>
                                View Deals
                                </Menu.Item>
                            </SubMenu> */}
                        </SubMenu>
                        
                        <Menu.Item key="8" icon={<SettingOutlined />}>Setting</Menu.Item>
                        <Menu.Item key="9" icon={<LogoutOutlined />}>Logout</Menu.Item>
                        
                        
                        
                    </Menu>
                    </Sider>
                    <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} >

                    </Header> */}
                    <Content style={{ margin: '0 16px' }}>
                        
                        <Switch>
                            <Route path="/additem" component={ additem }>
                            </Route>
                            <Route path="/viewanddeleteitem" component={ viewanddeleteitem }>
                            </Route>
                        </Switch>
                        
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                        </div> */}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
                </Router>
            </div>
        );
      }
}

export default RaLayout;