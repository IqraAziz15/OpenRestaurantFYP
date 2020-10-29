import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import { Navbar, Nav, Form, NavDropdown, Container } from 'react-bootstrap';
import { Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './home';
import { Input } from 'antd';
import "antd/dist/antd.css";
import P2Layout from './page2';
import "../../customer/customer.css";
const { Search } = Input;

class NavbarLayout extends React.Component
{
    render(){
        return(
            <div>
                <Router>
                <Container>
                    <br/>
                    <Navbar bg="light" variant="light" sticky="top" style={{marginLeft:'0', marginRight:'0'}}>
                        <Navbar.Brand href="">Open Restaurant</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link href="" style={{paddingRight:'5em'}}><Link className="link" to="/home" >Home</Link></Nav.Link>
                            <Nav.Link href="" style={{paddingRight:'5em'}}>Restaurants</Nav.Link>
                            {/* <Nav.Link href="" style={{paddingRight:'5em'}}>Menu</Nav.Link> */}
                            <NavDropdown title="Menu" id="collasible-nav-dropdown" style={{paddingRight:'5em'}}>
                                <NavDropdown.Item href="">Items</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="">Deals</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="" style={{paddingRight:'5em'}}>Sign Up/Sign In</Nav.Link>
                        </Nav>
                        <Form inline>
                            <i class="material-icons" style={{paddingRight:'2.5em'}}>shopping_cart</i>
                        </Form>
                    </Navbar>
                    <br/>
                    <Search
              className="search-box"
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              enterButton
            />
                </Container>
                <Container className='App-intro'>
                    <Switch>
                        <Route path="/home" component={Home}>
                        {/* <Route path={'/view/'} render={(props) => ( <P2Layout {...props} id={this.state.restId} />)}/> */}
                        </Route>
                    </Switch>
                </Container>
                </Router>
            </div>
        )
    }
}
export default NavbarLayout;