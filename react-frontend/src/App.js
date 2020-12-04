import React from 'react';
import "antd/dist/antd.css";
import RaLayout from './components/layouts/restaurantAdminLayout/restaurantadminlayout';
import SaLayout from './components/layouts/superAdminLayout/superadminlayout';
import CLayout from './components/layouts/customerLayout/customerlayout';
import P2Layout from './components/layouts/customerLayout/page2';
import NavbarLayout from './components/layouts/customerLayout/navbar';
import Home from './components/layouts/customerLayout/home';
import CartLayout from './components/layouts/customerLayout/addcart';
import Cart from './components/customer/cartComponents/cartCard';
import Proceedtocheckout from './components/customer/cartComponents/proceedtocheckout';
import Successmsg from './components/customer/cartComponents/successmsg';
import Orderhistory from './components/customer/cartComponents/vieworder';
// import MainPageLayout from './components/layouts/userProfileLayout/restaurantadmin';
// import MainPageLayout from './components/layouts/userProfileLayout/superadmin';
// import MainPageLayout from './components/layouts/userProfileLayout/waiter';
// import MainPageLayout from './components/layouts/userProfileLayout/staff';
import SProfile from './components/staff/sprofile';
import SSettings from './components/staff/ssettings';
import Allorders from './components/staff/sallorders';
import signin from './components/userProfile/staff/signin';

import MainPageLayout from './components/layouts/mainLayout/mainlayout';
import { Provider } from 'react-redux';
import store from './flux/store/store_restaurant_admin';
// import store from './flux/store/store_super_admin';
// import store from './flux/store/store_staff';
// import store from './flux/store/store_waiter';
import EditItem from './components/restaurantAdmin/item/edititem';
import { loadUser } from './flux/actions/restaurantAdmin/authActions';
// import { loadUser } from './flux/actions/superAdmin/authActions';
// import { loadUser } from './flux/actions/staff/authActions';
// import { loadUser } from './flux/actions/waiter/authActions';
import { Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signupra from './components/layouts/superAdminLayout/restaurantadmin';
import  RegisterModal  from './components/userProfile/restaurantAdmin/signup';
import AppNavbar3 from './components/layouts/userProfileLayout/staff';

// import RestaurantAdmin from './components/restaurant_admin';
// import AddItem from './components/additems';
// import AddItem from './components/extra';
// import ViewItems from './components/viewanddeleteitem';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect
// } from 'react-router-dom';
// import { Router } from 'express';
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51HEBkBAA6YnKro0mXZpOZTmOQOMYTdMlZnvkfVxa9GvKq7vybBYkuKyWib3dIVpJ9IKYPk9l4TSnkHpnAS7Cm9L300TDmPH2NG");



class App extends React.Component{
  
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
  return (
    <div className="App" >
      {/* <P2Layout/> */}
      <Elements stripe={stripePromise}>
          <Provider store={store}>
            <CLayout />
          </Provider>
        </Elements>
      {/* <RaLayout/> */}
      {/* <CartLayout/> */}
      {/* <NavbarLayout/> */}
      {/* <ViewItems/> */}
      {/* <Home/> */}
      {/* <AddItem/> */}
      {/* <Cart/> */}
      {/* <Proceedtocheckout/> */}
      {/* <Orderhistory/> */}
      {/* <Successmsg/> */}
      {/* <Router>
        <ul>
          <li> <Link to="/additem">Add Item</Link> </li>

        </ul>
      <Switch>
        <Route path="/additem" component={additem} />
        <Redirect to="/additem" />
      </Switch>

      
      
    </Router> */}

      {/* <div>
        <Additem/>
      </div> */}
     {/* <Router>
      <a className="link" href="/customer">
       Customer
      </a>
      <a className="link" href="/mlayout">
        Main Layout
      </a>
      <Switch>
        <Route path="/customer" component = {CLayout}>
        </Route>        
        <Provider store={store} >
        <div>
        {/* <MainPageLayout/>
         */}
         {/* <Route path="/mlayout" component = {MainPageLayout}>
        </Route>
        
        </div>
      </Provider>            
      </Switch>

      
      </Router>  */} 

      {/* <Provider store={store} > */}
        {/* <div>
        <MainPageLayout/>
        </div> */}
        {/* <Router>
    <Switch>
    <Route path="/staff/signin" component={signin}/>
      <Route path="/staff" component={AppNavbar3}>
      </Route>
      
      <Route path="/" component = {MainPageLayout}>
      </Route>
    </Switch>
    </Router>
      </Provider> */}
      
    </div>
   
   );
  
    };

}


export default App;
