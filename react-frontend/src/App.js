import React from 'react';
import RaLayout from './components/restaurantadminlayout';

// import { Provider } from 'react-redux';
// import store from './flux/store';
// import { loadUser } from './flux/actions/authActions';

// import AppNavbar from './components/appnavbar';
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
  
  // componentDidMount() {
  //   store.dispatch(loadUser());
  // }
  render() {
  return (
    <div className="App">
      <RaLayout/>
      
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

      {/* <Provider store={store}>
        <div>
          <AppNavbar/>
        </div>
      </Provider> */}
      
    </div>
   
   );
  
    }

}


export default App;
