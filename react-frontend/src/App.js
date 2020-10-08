import React from 'react';
import RaLayout from './components/layouts/restaurantAdminLayout/restaurantadminlayout';
import SaLayout from './components/layouts/superAdminLayout/superadminlayout';
import CLayout from './components/layouts/customerLayout/customerlayout';
import MainPageLayout from './components/layouts/userProfileLayout/a';

import { Provider } from 'react-redux';
import store from './flux/store/store_restaurant_admin';
import { loadUser } from './flux/actions/restaurantAdmin/authActions';
import Signupra from './components/layouts/superAdminLayout/restaurantadmin';
import  RegisterModal  from './components/userProfile/restaurantAdmin/signup';
import AppNavbar from './components/layouts/userProfileLayout/a';
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

class App extends React.Component{
  
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
  return (
    <div className="App">
      {/* <CLayout/> */}
      {/* <RaLayout/> */}
      
      
      {/* <ViewItems/> */}
      
      {/* <AddItem/> */}

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

      <Provider store={store}>
        <div>
        {/* <MainPageLayout/> */}
        <SaLayout/>
        </div>
      </Provider>
      
    </div>
   
   );
  
    };

}


export default App;
