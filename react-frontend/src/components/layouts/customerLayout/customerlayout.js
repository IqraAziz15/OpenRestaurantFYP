import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-design-icons/iconfont/material-icons.css";
import { Navbar, Nav, Form, NavDropdown, Container } from "react-bootstrap";
import "antd/dist/antd.css";
// import RateComponent from "../../customer/reviewRatingComponents/addRatings";
// import RestaurantCard from "../../customer/viewComponent/restaurantCard";
// import ItemCard from "../../customer/viewComponent/itemCard";
import AllItemsCard from "../../customer/viewComponent/allItemsCard";
import AllDealsCard from "../../customer/viewComponent/allDealsCard";
// import DealCard from "../../customer/viewComponent/dealCard";
import AllRestaurantsCard from "../../customer/viewComponent/allRestaurantsCard";
import Checkout from "../../customer/cartComponents/proceedtocheckout";
import CallViewOrder from "../../customer/cartComponents/callViewOrder";
import Successmsg from "../../customer/cartComponents/successmsg";
// import OrderHistory from "../../customer/cartComponents/vieworder";
import "../../customer/customer.css";
import { message, Card, Col, Row, Divider, Input, Badge, Button } from "antd";
import { ShoppingCartOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
// import Slider from "react-slick";
import { Spin } from "antd";
import Home from "./home";
// import ViewItem from "../../customer/viewComponent/viewItem";
// import P2Layout from "../../customer/viewComponent/viewRestaurant";
import Cart from "../../customer/cartComponents/cartCard";
import ViewRest from "../../customer/viewComponent/callViewRest";
import CallViewItem from "../../customer/viewComponent/callViewItem";
import CallViewDeals from "../../customer/viewComponent/callViewDeals";
import MyOrders from '../../customer/orderComponents/myorder';
import OrdersHistory from '../../customer/orderComponents/ordershistory';
import EmptyCart from '../../customer/cartComponents/emptycart';
import PaymentGateway from "../../payment_gateways/call_payment_methods";
import LoginForm from '../../userProfile/customer/loginform'
import Logout from '../../userProfile/customer/logout';
import Mobile from "./mobileNav";
import Tablet from "./tabletNav";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Link,
  // Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
  useRouteMatch,
} from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;

class CLayout extends React.Component {
  state = {
    screenWidth: null,
    // customerId: "5fa7fe33910c3a1810eccbc9",
    user: '',
    cart_length: 0,
    loading: true
  };


  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    // error : PropTypes.object.isRequired
  }


  async componentDidMount() {
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    window.addEventListener("resize", this.updateWindowDimensions());
    // console.log(this.state.user)
    this.id = setTimeout(() => {
      if (!this.props.auth.isLoading) {
        this.setState({ loading: false })
        this.setCartLength();
      }
    }, 3000)
    if (!this.state.loading) await this.setCartLength();
  }

  componentDidUpdate(prevProps) {
    if (this.props.yourUpdatedReducer !== prevProps.yourUpdatedReducer) {
      this.setState({
        loading: false
      })
      if (!this.props.auth.isLoading && this.props.auth.user) this.setCartLength()
    }
  }



  // async isLoading(){
  //   while(this.props.auth.isLoading){}
  // }

  // componentDidUpdate(){
  //   if(this.props.auth.user){
  //     this.setCartLength();
  //   }
  // }

  componentWillUnmount() {
    clearTimeout(this.id)
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth });
  }

  setCartLength = () => {
    var count = 0;
    if (this.props.isAuthenticated) {
      if (this.props.auth.cart.length > 0) {
        this.props.auth.cart.forEach((rest) => {
          count = count + rest.rest.length;
        });
        this.setState({ cart_length: count, user: this.props.auth.user });
      }
      console.log(this.state.cart_length);
      console.log(this.state.user)
    }
  };

  render() {
    const { isAuthenticated } = this.props;
    const enterButton = (
      <Button
        style={{ backgroundColor: '#667777', border: '1px solid #667777', borderRadius: '1pxm', margin: '0' }}
        icon={<SearchOutlined
          style={{
            color: '#fff',
            paddingTop: '0em',
            paddingBottom: '0.3em'
          }} />}></Button>
    );
    if (this.state.screenWidth <= 652)
      return (
        <div>
          <Mobile />
        </div>
      );
    if (this.state.screenWidth <= 1024)
      return (
        <div>
          <Tablet />
        </div>
      );
    return (
      <div>
        {this.state.loading || this.props.auth.isLoading ? (
          <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait"
              size="large"
            />
          </center>
        ) :
          <div className="app-container" style={{ height: "max-content" }}>
            <Router>
              <Container
                style={{
                  marginRight: "0em",
                  marginLeft: "0em",
                  textAlign: "center",
                }}
              >
                <br />
                <Navbar
                  bg="light"
                  variant="light"
                  sticky="top"
                  style={{
                    width: "100%",
                    margin: 0,
                    left: "-1",
                    right: "0",
                    sticky: "-1",
                    position: "fixed",
                    top: "-1",
                    borderBottom: "4px solid #bb8c63"
                  }}
                >
                  <Navbar.Brand href="">Open Restaurant</Navbar.Brand>
                  <br />

                  <Nav className="ml-auto">
                    <Nav.Link href="" style={{ paddingRight: "4em" }}>
                      <Link className="link" to="/home">
                        Home
                  </Link>
                    </Nav.Link>
                    <Nav.Link href="" style={{ paddingRight: "4em" }}>
                      <Link className="link" to="/allrestaurants">
                        Restaurants
                  </Link>

                    </Nav.Link>
                    {/* <Nav.Link href="" style={{paddingRight:'5em'}}>Menu</Nav.Link> */}
                    <NavDropdown
                      title="Menu"
                      id="collasible-nav-dropdown"
                      style={{ paddingRight: "2em" }}
                    >
                      <NavDropdown.Item href="">
                        <Link className="link" to="/allfoods">
                          Items
                    </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="">
                        <Link className="link" to="/alldeals">
                          Deals
                    </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      title="Orders"
                      id="collasible-nav-dropdown"
                      style={{ paddingRight: "2em" }}
                    >
                      <NavDropdown.Item href="">
                        <Link className="link" to="/myorders">
                          My Orders
                    </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="">
                        <Link className="link" to="/ordershistory">
                          Orders History
                    </Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                  </Nav>
                  {/* <Form inline>
                            <i class="material-icons" style={{paddingRight:'2.5em'}}> <Link className="link" to="/cart" >shopping_cart</Link></i>
                        </Form> */}
                  <Search style={{ width: '30%', border: '0.5px solid #667777', borderRight: '0px', borderRadius: '2px', padding: '0', marginRight: "2em" }}
                    className="search-box"
                    size='medium'
                    placeholder="Search here"
                    enterButton={enterButton}
                    onSearch={(value) => console.log(value)}

                  />
                  <Nav key="user" style={{ paddingBottom: 3, paddingRight: "1.5em" }}>
                    <Link className="link"
                      to='/login'
                      style={{ color: "#667777" }}
                    >
                      <UserOutlined
                        type="customer"
                        style={{ fontSize: 25, marginBottom: 3 }}
                      ><Logout /></UserOutlined>
                    </Link>
                  </Nav>
                  <Nav key="cart" style={{ paddingBottom: 3, paddingRight: "1.5em" }}>
                    <Badge count={this.state.user && this.state.cart_length}>
                      <Link className="link"
                        to="/cart"
                        style={{ marginRight: -22, color: "#667777" }}
                      >
                        <ShoppingCartOutlined
                          type="shopping-cart"
                          style={{ fontSize: 25, marginBottom: 3 }}
                        />
                      </Link>
                    </Badge>
                  </Nav>
                  <br />
                </Navbar>
              </Container>
              <Container
                className="App-intro"
                style={{ marginRight: "1em", marginLeft: "1em" }}
              >
                {/* <Redirect push to='/'/> */}
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/home" component={Home} />
                  <Route path="/allrestaurants" component={AllRestaurantsCard} />
                  <Route path="/allfoods" component={AllItemsCard} />
                  <Route path="/alldeals" component={AllDealsCard} />
                  <Route path="/myorders" component={MyOrders} />
                  <Route path="/ordershistory" component={OrdersHistory} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/order/checkout" component={Checkout} />
                  <Route path="/restaurantview/:id" component={ViewRest} />
                  <Route path="/view/:id" component={CallViewItem} />
                  <Route path="/viewdeal/:id" component={CallViewDeals} />
                  <Route path="/pending/order/:orderId" component={CallViewOrder} />
                  {/* <Route path="/place/order/:orderId" component={Successmsg} /> */}
                  {/* <Route path='/emptycart' component={EmptyCart} /> */}
                  <Route path='/login' component={LoginForm} />
                  {/* <Route
                    path="/order/payment/:orderId"
                    component={PaymentGateway}
                  /> */}
                </Switch>
              </Container>
            </Router>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, null)(CLayout);
