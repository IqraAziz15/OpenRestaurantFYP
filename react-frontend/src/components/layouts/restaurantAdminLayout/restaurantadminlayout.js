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
    LineChartOutlined,
    ContainerOutlined,
    AppstoreAddOutlined,
    FileAddOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import { Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import additem from '../../restaurantAdmin/item/additems';
import viewanddeleteitem from '../../restaurantAdmin/item/viewanddeleteitem';
import adddeal from '../../restaurantAdmin/deal/adddeals';
import viewanddeletedeal from '../../restaurantAdmin/deal/viewanddeletedeal';
import restaurantstatistics from '../../restaurantAdmin/restaurantStatistics/restaurantstatistics';
import adminstatistics from '../../restaurantAdmin/restaurantStatistics/adminstatistics';
import addstaff from '../../restaurantAdmin/staff/addstaff';
import viewanddeletestaff from '../../restaurantAdmin/staff/viewanddeletestaff';
import addwaiter from '../../restaurantAdmin/waiter/addwaiter';
import viewanddeletewaiter from '../../restaurantAdmin/waiter/viewanddeletewaiter';
import './restaurantadminlayout.css';
// import logo from '../assets/images/logo.png';
// import Title from 'antd/lib/skeleton/Title';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const { Text } = Typography;

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
                <Layout style={{ minHeight: '100vh' }} >
                    <Sider width="250" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" defaultOpenKeys={['1']}>
                        
                        <Menu.Item key="1" icon={<UserOutlined />}> User Profile</Menu.Item>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Restaurant Team">
                            {/* <Menu.Item key="2" icon={<UserOutlined />}>Waiter</Menu.Item> */}
                            <SubMenu key="sub3" title="Manage Waiter" icon={<UserOutlined />}>
                                <Menu.Item key="2" icon={<FileAddOutlined />}><Link className="link" to="/addwaiter">
                                Add Waiters
                                </Link>
                                </Menu.Item>
                                {/* <Menu.Item key="3" icon={<ContainerOutlined />}><Link className="link" to="">
                                Remove Waiters
                                </Link>
                                </Menu.Item> */}
                                <Menu.Item key="4" icon={<ContainerOutlined />}><Link className="link" to="/viewanddeletewaiter">
                                View Waiters
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title="Manage Staff" icon={<UserOutlined />}>
                                <Menu.Item key="5" icon={<FileAddOutlined />}><Link className="link" to="/addstaff">
                                Add Staff
                                </Link>
                                </Menu.Item>
                                {/* <Menu.Item key="6" icon={<ContainerOutlined />}><Link className="link" to="">
                                Remove Staff
                                </Link>
                                </Menu.Item> */}
                                <Menu.Item key="7" icon={<ContainerOutlined />}><Link className="link" to="/viewanddeletestaff">
                                View Staff
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                            {/* <Menu.Item key="3" icon={<UserOutlined />}>Staff</Menu.Item> */}
                        </SubMenu>
                        <SubMenu key="sub5" icon={<FormOutlined />} title="Restaurant Work">
                            <SubMenu key="sub6" title="Manage Items" icon={<DatabaseOutlined />}>
                                <Menu.Item key="8" icon={<FileAddOutlined />}><Link className="link" to="/additem">
                                Add Items
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="9" icon={<ContainerOutlined />}><Link className="link" to="/viewanddeleteitem">
                                View Items
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" title="Manage Deals"  icon={<AppstoreOutlined />}>
                                <Menu.Item key="10" icon={<AppstoreAddOutlined />}>
                                <Link className="link" to="/adddeal">
                                Add Deals
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="11" icon={<WindowsOutlined />}>
                                <Link className="link" to="/viewanddeletedeal">
                                View Deals
                                </Link>
                                </Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        
                        <Menu.Item key="12" icon={<SettingOutlined />}>Setting</Menu.Item>
                        <Menu.Item key="13" icon={<LineChartOutlined />}>
                            <Link className="link" to="/adminstatistics" >Statistics</Link>
                            </Menu.Item>
                        <Menu.Item key="14" icon={<LogoutOutlined />}>Logout</Menu.Item>
                        
                        
                        
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
                            <Route path="/adddeal" component={ adddeal }>
                            </Route>
                            <Route path="/viewanddeletedeal" component={ viewanddeletedeal }>
                            </Route>
                            <Route path="/adminstatistics" component={ adminstatistics }>
                            </Route>
                            <Route path="/addstaff" component={ addstaff }>
                            </Route>
                            <Route path="/viewanddeletestaff" component={ viewanddeletestaff }>
                            </Route>
                            <Route path="/addwaiter" component={ addwaiter }>
                            </Route>
                            <Route path="/viewanddeletewaiter" component={ viewanddeletewaiter }>
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