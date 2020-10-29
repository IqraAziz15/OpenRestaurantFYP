import React, {Fragment} from "react";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
import ItemCard from "../../customer/viewComponent/itemCard";
import AllItemsCard from "../../customer/viewComponent/allItemsCard";
import DealCard from "../../customer/viewComponent/dealCard";
import AllRestaurantsCard from "../../customer/viewComponent/allRestaurantsCard";
import Slider from "react-slick";
import { Spin } from "antd";
import ViewItem from "../../customer/viewComponent/viewItem";
import P2Layout from "../../customer/viewComponent/viewRestaurant";
import { Link, BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './home';

export default class RoutesCustomer extends React.Component {
    render(){
        return (
            <div>
                <Router>
                    <Route path={"/home"} component={Home}></Route>
                    <Route path={"/view/:id"} component={P2Layout}></Route>
                </Router>
            </div>
        )
    }
}