import React, { Fragment } from "react";
import "antd/dist/antd.css";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
// import ItemCard from "../../customer/viewComponent/itemCard";
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

class DLayout extends React.Component {
  state = {
    deals: [],
    link: "",
    dealId: "",
    restId: "",
    viewItem: false,
    viewRest: false,
    loading: true,
  };

  componentDidMount = () => {
    const pointerToThis = this;
    fetch("http://localhost:4000/restaurantadmin/deal/getalldeals/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ deals: data, loading: false }));
  };

  render() {
    const gridStyle = {
      width: "33%",
      textAlign: "center",
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      borderWidth: 0,
      borderColor: '#FFDAB9'
    };

    return (
      <div>
        {this.state.loading ? (
          <center>
            <Spin
              className="spinner"
              tip="Loading...Please Wait" 
              size="large"
            />
          </center>
        ) : (
          <div className="item-card-div" style={{paddingTop:"2em"}}>
            <Divider className="divider" orientation="left" />
            {this.state.deals.map((deal) => (
              <Link style={{ cursor:"pointer" }} href={`/viewdeal/${deal._id}`} key={deal._id}>
              <Card.Grid hoverable={false} style={gridStyle}>
                <a
                  style={{ cursor: "pointer" }}
                >
                  <DealCard style={{ cursor:"pointer" }}                 
                      name={deal.name}
                      description={deal.description}
                      price={deal.total_bill}
                      ratings={deal.rating}
                      count={deal.rating_count}
                      img_url={deal._id}
                    />
                </a>
              </Card.Grid>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default DLayout;
