import React, { Component } from "react";
import "antd/dist/antd.css";
import "./viewItem.css";
import { message, Divider, Tabs, Spin, Rate, Space, Card, Button, Tooltip } from "antd";
import Image from "react-bootstrap/Image";
import RatingComponent from "../reviewRatingComponents/ratingComponent";
import ReviewComponent from "../reviewRatingComponents/reviewComponent";
// import ItemCounter from "../cartComponents/itemCounter";
import ItemCounter from '../../layouts/customerLayout/counter'
const { Meta } = Card;
const { TabPane } = Tabs;

class ViewItem extends Component {
  state = {
    itemId: this.props.id,
    item: "",
    loading: false,
  };

  componentDidMount() {
    
    var pointerToThis = this;
    fetch(
      `http://localhost:4000/restaurantadmin/item/viewitem/${this.state.itemId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ item: data }));
  }

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
                  src={`http://localhost:4000/restaurantadmin/item/image/${this.state.itemId}`}
                  roundedCircle
                />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle2}>
                <Card className="grid-card">
                  <p>
                    <span className="item-name">{this.state.item.name}</span>
                    <br/>
                    {this.state.item.description}<hr/>
                    <span className='price'>Rs. {this.state.item.price}</span><hr/>
                  </p>
                  <RatingComponent
                    ratings={3.9}
                    count={this.state.item.rating_count}
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
                <Button className='button' color={'#855b36'} onClick={()=> {message.success('Item added to Cart')}}>Add to Cart</Button>
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

export default ViewItem;
