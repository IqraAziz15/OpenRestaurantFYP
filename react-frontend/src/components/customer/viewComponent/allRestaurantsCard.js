import React, { Fragment } from "react";
import "antd/dist/antd.css";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
import ItemCard from "../../customer/viewComponent/itemCard";
import DealCard from "../../customer/viewComponent/dealCard";
import "../../customer/customer.css";
import { message, Card, Col, Row, Divider, Input } from "antd";
import Slider from "react-slick";
import { Spin } from "antd";
import ViewItem from "../../customer/viewComponent/viewItem";
import P2Layout from "../../customer/viewComponent/viewRestaurant";
import {
  Link,
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;

class CLayout extends React.Component {
  state = {
    rests: [],
    link: "",
    itemId: "",
    restId: "",
    viewItem: false,
    viewRest: false,
    loading: true,
  };

  componentDidMount = () => {
    const pointerToThis = this;
    fetch("http://localhost:4000/customer/restaurant/viewrestaurant/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ rests: data, loading: false }));
  };

  render() {
    const gridStyle = {
      width: "20%",
      textAlign: "center",
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      borderWidth: 0,
      borderColor: '#FFDAB9'
    };

    return (
      <div className='app-container'>
        {this.state.loading ? (
          <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait"
              size="large"
            />
          </center>
        ) : (
          <div className="rest-card-div">
            <Divider className="divider" orientation="left" />
            {this.state.rests.map((rest) => (
              <a style={{ cursor:"pointer" }} href={`/restaurantview/${rest._id}`} key={rest._id}>
              <Card.Grid hoverable={false} style={gridStyle}>
                <a
                  style={{ cursor: "pointer" }}
                  onMouseDown={() => this.toggleStateRest(rest.name, rest._id)}
                >
                  <RestaurantCard
                    name={rest.name}
                    location={rest.location}
                    ratings={rest.average_ratings}
                    count={rest.rating_count}
                  />
                </a>
              </Card.Grid>
              </a>
            ))}
            {this.state.rests.map((rest) => (
              <a style={{ cursor:"pointer" }} href={`/restaurantview/${rest._id}`} key={rest._id}>
              <Card.Grid hoverable={false} style={gridStyle}>
                <a
                  style={{ cursor: "pointer" }}
                  onMouseDown={() => this.toggleStateRest(rest.name, rest._id)}
                >
                  <RestaurantCard
                    name={rest.name}
                    location={rest.location}
                    ratings={rest.average_ratings}
                    count={rest.rating_count}
                  />
                </a>
              </Card.Grid>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CLayout;
