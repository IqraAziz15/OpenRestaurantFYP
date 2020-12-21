import React, { Component } from "react";
import "antd/dist/antd.css";
import "./viewItem.css";
import { Pagination, message, Divider, Tabs, Spin, Rate, Space, Card, Button, Tooltip, InputNumber } from "antd";
import Image from "react-bootstrap/Image";
import RatingComponent from "../reviewRatingComponents/ratingComponent";
import ReviewComponent from "../reviewRatingComponents/reviewComponent";
// import ItemCounter from "../cartComponents/itemCounter";
import axios from 'axios';
// import ItemCounter from '../../layouts/customerLayout/counter'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
const { Meta } = Card;
const { TabPane } = Tabs;

class ViewDeals extends Component {
  state = {
    dealId: this.props.id,
    rest: '',
    deal: "",
    loading: true,
    addCart: true,
    likedreviews: [],
    redirect: false,
    quantity:1
  };

  
   static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
}

  onChange = (value) => {
    this.setState({ quantity:value })
  }


  componentDidMount= async() => {
    
    var pointerToThis = this;
    await fetch(
      `http://localhost:4000/api/ratings/getratings-reviews-item`,
      {
        method: "POST",
        body: JSON.stringify({ deal: this.state.dealId}),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ deal: data }));
      // console.log(deal)
      
      var body = JSON.stringify({ id: this.state.deal.rest_id });
    await fetch("http://localhost:4000/restaurantadmin/restaurant/getrestaurant/", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => pointerToThis.setState({ rest: data, loading: false }));
  }

  success = (content) => {
    message.success({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

  error = (content) => {
    message.error({
      content: content,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

addToCart = async() => {
  if(this.props.auth.user){
    this.setState({addCart: false});
    var body =
    {
      cid: this.props.auth.user._id,
      iid: this.state.dealId,
      quantity: this.state.quantity,
      rid: this.state.rest._id
    }
    var header= {
      'Content-Type': 'application/json'
    }
    var res = await axios.post(`http://localhost:4000/customer/cart/addCart`, body, header
    )
    if (res.status == 200){
        this.success('Added to cart')
        this.props.auth.user.cart = res.data;
      } 
    else  this.error('Try Again')
    this.setState({addCart: true});
  }
  else await this.setState({redirect: true});
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
      justifyContent: "baseline",
      borderWidth: 0,
    };
    const gridStyle2 = {
      width: "25%",
      textAlign: "left",
      justifyContent: "center",
      borderWidth: 0,
    };
    const {isAuthenticated, user} = this.props.auth;
    if(!isAuthenticated && this.state.redirect) {
      return (<Redirect push to='/login'/>)
    }
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
          <div style={{ paddingTop:'4em'}}>
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
                <Card className="grid-card-deal">
                  <p>
                    <span className="item-name">{this.state.deal.name}</span>
                    <br/>
                    {this.state.deal.description}<hr/>
                    <span className="price">Rs. {this.state.deal.total_bill}</span><hr/>
                  </p>
                  <RatingComponent
                    ratings={this.state.deal.avg_rating}
                    count={this.state.deal.count}
                    type="inner"
                  />
                </Card>
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Card className="grid-card card1">
                <p>{this.state.rest.name}</p>
                  {/* <RatingComponent
                    ratings={4.1}
                    count={32}
                    type="inner"
                  /> */}
                </Card>
                <hr/>
                <Card className="button-card">
                <Space directon='Horizontal' size='large'>
                <InputNumber min={1} max={20} defaultValue={1} onChange={this.onChange} />
                {/* <ItemCounter default={1} min={1} max={10}/> */}
                <Button className='button' loading={!this.state.addCart} id='add-cart-button' color={'#855b36'} onClick={()=>this.addToCart()}>Add to Cart</Button>
                </Space>
                </Card>
              </Card.Grid>
            </Card>
            <Divider/>
            <Card>
            <Tabs className='review-tabs' defaultActiveKey="1">
              <TabPane tab="Top Reviews" key="1">
              {this.state.deal.reviews.map(review =>
              (this.state.likedreviews.length>0 ? 
              <>
                {this.state.likedreviews.map(review_id => 
                  review_id.review == review._id ?
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary={review_id.like_dislike == 1 ? 'primary' : 'false'} 
                  disprimary={review_id.like_dislike == -1 ? 'primary' : 'false'} 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />
                  :
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />)
                }
                </>
                :
                <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />
              )
              )}
              </TabPane>
              <TabPane tab="Positive Reviews" key="2">
                {this.state.deal.reviews.map(review =>
                review.good_review == 1 ?
                <>
                {this.state.likedreviews.length>0 ?
                this.state.likedreviews.map(review_id => 
                  review_id.review == review._id ?
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary={review_id.like_dislike == 1 ? 'primary' : 'false'} 
                  disprimary={review_id.like_dislike == -1 ? 'primary' : 'false'} 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />
                  :
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />)
                
                :
                <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />
                }
                </>
                : ''
              )}
              </TabPane>
              <TabPane tab="Negative Reviews" key="3">
                {this.state.deal.reviews.map(review =>
                review.good_review == 0 ?
                <>
                  {this.state.likedreviews.length>0 ?
                    this.state.likedreviews.map(review_id => 
                  review_id.review == review._id ?
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary={review_id.like_dislike == 1 ? 'primary' : 'false'} 
                  disprimary={review_id.like_dislike == -1 ? 'primary' : 'false'} 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />
                  :
                  <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />)
                
                :
                <ReviewComponent 
                  likes={review.likes} 
                  review_id={review._id} 
                  primary='false'
                  disprimary='false' 
                  dislikes={review.dislikes} review={review.review} 
                  item_id={this.state.deal._id}
                  />
                }
                </>
                : ''
              )}
              </TabPane>
            </Tabs>
            </Card>
          </div>
        )}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null) (ViewDeals);
