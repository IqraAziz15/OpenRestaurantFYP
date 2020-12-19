import React, {Fragment} from "react";
import "antd/dist/antd.css";
import RateComponent from "../../customer/reviewRatingComponents/addRatings";
import RestaurantCard from "../../customer/viewComponent/restaurantCard";
import ItemCard from "../../customer/viewComponent/itemCard";
import AllItemsCard from "../../customer/viewComponent/allItemsCard";
import DealCard from "../../customer/viewComponent/dealCard";
import AllRestaurantsCard from "../../customer/viewComponent/allRestaurantsCard";
import "../../customer/customer.css";
import { message, Card, Col, Row, Divider, Input } from "antd";
import Slider from "react-slick";
import { Spin } from "antd";
import CallViewItem from "../../customer/viewComponent/callViewItem";
// import P2Layout from "../../customer/viewComponent/viewRestaurant";
import ViewRest from "../../customer/viewComponent/callViewRest";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Search } = Input;

class Home extends React.Component {
  state = {
    rests: [],
    items: [],
    deals: [],
    link: '',
    itemId: '',
    restId: '',
    viewItem: false,
    viewRest: false,
    loading: true,
    
  };


  componentWillMount = () => {
    const pointerToThis = this;
    fetch("http://localhost:4000/customer/restaurant/viewrestaurant/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ rests: data, loading: false }));

    fetch("http://localhost:4000/api/ratings/allratingswithitems/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ items: data.items, deals: data.deals }));
  }

  render() {
    const settings = {
      className: "center",
      infinite: true,
      lazyLoad: true,
      centerPadding: "80px",
      slidesToShow: 5,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const settings1 = {
      className: "center",
      infinite: true,
      lazyLoad: true,
      centerPadding: "80px",
      slidesToShow: 3,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        }
      ],
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
          <div className="rest-card App-intro">
            {/* <Divider className="divider" orientation="left" /> */}
            <Card
              className="all-rest-card"
              title="All Restaurants"
              extra={<a className="link" href="/allrestaurants" >Show All</a>}
            >
              <Slider {...settings}>
                {this.state.rests.map((rest) => (
                  <Link style={{ cursor:"pointer" }} to={`/restaurantview/${rest._id}`} key={rest._id}>
                  <RestaurantCard
                    name={rest.name}
                    location={rest.location}
                    ratings={rest.average_ratings}
                    count={rest.rating_count}
                  /></Link>
                ))}
                {this.state.rests.map((rest) => (
                  <Link style={{ cursor:"pointer" }} to={`/restaurantview/${rest._id}`} key={rest._id}>
                  <RestaurantCard
                    name={rest.name}
                    location={rest.location}
                    ratings={rest.average_ratings}
                    count={rest.rating_count}
                  />
                  </Link>
                ))}
              </Slider>
            </Card>
            {/* {this.state.viewRest ? 
            ViewRestLink
            : ''} */}
            {/* <Divider className="divider" orientation="left" /> */}
            <Card
              className="all-rest-card"
              title="All Items"
              extra={<a className="link" href="/allfoods" >Show All</a>}
            >
              <Slider {...settings}>
                {this.state.items.map((item) => (
                  <Link style={{ cursor:"pointer" }} to={`/view/${item._id}`} key={item._id}>
                    <ItemCard style={{ cursor:"pointer" }}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      ratings={item.avg_rating}
                      count={item.count}
                      img_url={item._id}
                    />
                  </Link>
                ))}
              </Slider>
            </Card>
            {/* {this.state.viewItem ? 
            ViewItemLink
            : ''} */}
            <Card
              className="all-rest-card"
              title="All Deals"
              extra={<a className="link" href="/alldeals" >Show All</a>}
            >
              <Slider {...settings1}>
                {this.state.deals.map((deal) => (
                <Link style={{ cursor:"pointer" }} to={`/viewdeal/${deal._id}`} key={deal._id}>
                    <DealCard style={{ cursor:"pointer" }}
                      name={deal.name}
                      description={deal.description}
                      price={deal.total_bill}
                      ratings={deal.avg_rating}
                      count={deal.count}
                      img_url={deal._id}
                    />
                </Link>
                ))}
              </Slider>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
