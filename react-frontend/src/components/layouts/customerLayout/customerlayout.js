import React, {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import { Navbar, Nav, Form, NavDropdown, Container } from 'react-bootstrap';
import "antd/dist/antd.css";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
import ItemCard from "../../customer/viewComponent/itemCard";
import AllItemsCard from "../../customer/viewComponent/allItemsCard";
import AllDealsCard from "../../customer/viewComponent/allDealsCard";
import DealCard from "../../customer/viewComponent/dealCard";
import AllRestaurantsCard from "../../customer/viewComponent/allRestaurantsCard";
import Checkout from '../../customer/cartComponents/proceedtocheckout';
import CallViewOrder from '../../customer/cartComponents/callViewOrder';
import Successmsg from '../../customer/cartComponents/successmsg';
import OrderHistory from '../../customer/cartComponents/vieworder';
import "../../customer/customer.css";
import { message, Card, Col, Row, Divider, Input, Badge} from "antd";
import {ShoppingCartOutlined} from '@ant-design/icons';
import Slider from "react-slick";
import { Spin } from "antd";
import Home from './home';
import ViewItem from "../../customer/viewComponent/viewItem";
import P2Layout from "../../customer/viewComponent/viewRestaurant";
import Cart from '../../customer/cartComponents/cartCard';
import ViewRest from "../../customer/viewComponent/callViewRest";
import CallViewItem from "../../customer/viewComponent/callViewItem";
import CallViewDeals from "../../customer/viewComponent/callViewDeals";
import Mobile from './mobileNav';
import Tablet from './tabletNav';
import { Link, Redirect, BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;

class CLayout extends React.Component {
    state = { 
        screenWidth: null,
        customerId : "5fa7fe33910c3a1810eccbc9",
        user : '', 
        };
    
    getCustomer = async() => {
        const pointerToThis= this;
        await fetch(`http://localhost:4000/userprofile/customer/getcustomer/${this.state.customerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => pointerToThis.setState({ user: data, loading: false }));
    }
    
    componentDidMount() {
        this.getCustomer();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        window.addEventListener("resize", this.updateWindowDimensions());
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }
    
    updateWindowDimensions() {
       this.setState({ screenWidth: window.innerWidth });
    }
  render() {
    if (this.state.screenWidth <= 652) return <div><Mobile/></div>;
    if (this.state.screenWidth <= 1024) return <div><Tablet/></div>;
      return(
            <div className="app-container" style={{height: 'max-content'}}>
                <Router>
                <Container style={{marginRight:'0em', marginLeft:'0em', textAlign: 'center'}}>
                    <br/>
                    <Navbar bg="light" variant="light" sticky="top" style={{width: '100%', margin: 0, left: '-1', sticky: '-1', positon: 'fixed', top: '-1'}}>
                        <Navbar.Brand href="">Open Restaurant</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link href="" style={{paddingRight:'5em'}}><Link className="link" to="/home" >Home</Link></Nav.Link>
                            <Nav.Link href="" style={{paddingRight:'5em'}}><Link className="link" to="/allrestaurants" >Restaurants</Link></Nav.Link>
                            {/* <Nav.Link href="" style={{paddingRight:'5em'}}>Menu</Nav.Link> */}
                            <NavDropdown title="Menu" id="collasible-nav-dropdown" style={{paddingRight:'5em'}}>
                                <NavDropdown.Item href=""><Link className="link" to="/allfoods" >Items</Link></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href=""><Link className="link" to="/alldeals" >Deals</Link></NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="" style={{paddingRight:'5em'}}>Sign Up/Sign In</Nav.Link>
                        </Nav>
                        {/* <Form inline>
                            <i class="material-icons" style={{paddingRight:'2.5em'}}> <Link className="link" to="/cart" >shopping_cart</Link></i>
                        </Form> */}
                         <Nav key="cart" style={{ paddingBottom: 3 }}>
                            <Badge count={this.state.user && this.state.user.cart.length}>
                                <a href="/cart" style={{ marginRight: -22 , color:'#667777'}}>
                                <ShoppingCartOutlined type="shopping-cart" style={{ fontSize: 25, marginBottom: 3 }} />
                                </a>
                            </Badge>
                        </Nav>
                    </Navbar>
                    <br/>
                    <Search
              className="search-box"
              placeholder="Search here"
              onSearch={(value) => console.log(value)}
              enterButton
            />
                </Container>
                <Container className='App-intro' style={{marginRight:'1em', marginLeft:'1em'}}>
                <Switch>
                  <Route exact path="/" component={Home}/>    
                  <Route path="/home" component={Home}/>
                  <Route path='/allrestaurants' component={AllRestaurantsCard}/>
                  <Route path='/allfoods' component={AllItemsCard}/>
                  <Route path='/alldeals' component={AllDealsCard}/>
                  <Route path='/cart' component={Cart}/>
                  <Route path='/order/checkout' component={Checkout}/>
                  <Route path='/restaurantview/:id' component={ViewRest}/>
                  <Route path='/view/:id' component={CallViewItem}/>
                  <Route path='/viewdeal/:id' component={CallViewDeals}/>
                  <Route path='/pending/order/:orderId' component={CallViewOrder}/>
                  <Route path='/place/order/:orderId' component={Successmsg}/>
                </Switch>
                </Container>
                </Router>
            </div>
    );
  }
}

export default CLayout;
