import React, { Component } from "react";
import "antd/dist/antd.css";
import "./viewItem.css";
import { message, Divider, Tabs, Spin, Rate, Space, Card, Button, Tooltip } from "antd";
import Image from "react-bootstrap/Image";
import RatingComponent from "../reviewRatingComponents/ratingComponent";
import ReviewComponent from "../reviewRatingComponents/reviewComponent";
// import ItemCounter from "../cartComponents/itemCounter";
import axios from 'axios';
import ItemCounter from '../../layouts/customerLayout/counter'
const { Meta } = Card;
const { TabPane } = Tabs;

class ViewDeals extends Component {
  state = {
    dealId: this.props.id,
    deal: "",
    loading: false,
    addCart: true,
    customerId: '5fa7fe33910c3a1810eccbc9'
  };

  componentDidMount() {
    
    var pointerToThis = this;
    fetch(
      `http://localhost:4000/restaurantadmin/deal/viewdeal/${this.state.dealId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ deal: data }));
  }


addToCart = async() => {
  this.setState({addCart: false});
  var body =
  {
    cid: this.state.customerId,
    iid: this.state.dealId
  }
  var header= {
    'Content-Type': 'application/json'
  }
  var res = await axios.post(`http://localhost:4000/customer/cart/addCart`, body, header
  )
  if (res.status == 200) message.success('Added to cart')
  else  message.error('Try Again')
  this.setState({addCart: true});
  
};

  render() {
    const gridStyle = {
      width: "45%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle1 = {
      width: "30%",
      textAlign: "center",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle2 = {
      width: "25%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
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
          <div style={{ paddingTop:'1.5em'}}>
            <Card className="view-card" style={{ height: "280px" }}>
              <Card.Grid hoverable={false} style={gridStyle1}>
                <Image
                  className="image"
                  width={250}
                  height={220}
                  src={`http://localhost:4000/restaurantadmin/deal/image/${this.state.dealId}`}
                  roundedCircle
                />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle2}>
                <Card className="grid-card">
                  <p>
                    <span className="item-name">{this.state.deal.name}</span>
                    <br/>
                    {this.state.deal.description}<hr/>
                    <span className="price">Rs. {this.state.deal.total_bill}</span><hr/>
                  </p>
                  <RatingComponent
                    ratings={3.9}
                    count={this.state.deal.rating_count}
                    type="inner"
                  />
                </Card>
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Card className="grid-card card1">
                  <p>Texas Chicken</p>
                  <RatingComponent
                    ratings={4.1}
                    count={32}
                    type="inner"
                  />
                </Card>
                <hr/>
                <Card className="button-card">
                <Space directon='Horizontal' size='large'>
                <ItemCounter default={1} min={1} max={10}/>
                <Button className='button' loading={!this.state.addCart} id='add-cart-button' color={'#855b36'} onClick={()=>this.addToCart()}>Add to Cart</Button>
                </Space>
                </Card>
              </Card.Grid>
            </Card>
            <Divider/>
            <Card>
            <Tabs className='review-tabs' defaultActiveKey="1">
              <TabPane tab="Top Reviews" key="1">
                <ReviewComponent likes={100} dislikes={12} review="loving it!"/>
                <ReviewComponent likes={230} dislikes={7} review="It was amazing!"/>
                <ReviewComponent likes={50} dislikes={2} review="My experience was just okay!"/>
                <ReviewComponent likes={10} dislikes={1} review="Too bad. Horrible taste!"/>
              </TabPane>
              <TabPane tab="Positive Reviews" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Negative Reviews" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default ViewDeals;
