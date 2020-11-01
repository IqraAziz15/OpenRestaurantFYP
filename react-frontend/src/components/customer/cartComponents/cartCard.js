import React, { Component } from "react";
import "antd/dist/antd.css";
import "../viewComponent/viewItem.css";
import { Divider, Tabs, Spin, Rate, Space, Card, Button, Tooltip } from "antd";
import Image from "react-bootstrap/Image";
import '../customer.css';
import Checkout from './proceedtocheckout';
import RatingComponent from "../reviewRatingComponents/ratingComponent";
import ReviewComponent from "../reviewRatingComponents/reviewComponent";
// import ItemCounter from "../cartComponents/itemCounter";
import ItemCounter from '../../layouts/customerLayout/counter'
const { Meta } = Card;
const { TabPane } = Tabs;

class Cart extends Component {
  state = {
    itemId: '5f96df9e379eb6263093e39d',
    item: "",
    quantity: 1,
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
  
  onChange(value) {
        this.setState({quantity: value});
    }

  render() {
    const gridStyle = {
      width: "45%",
      textAlign: "right",
      justifyContent: "center",
      borderWidth: 0,
    };
    const gridStyle1 = {
      width: "20%",
      marginTop: "1.8em",
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
    const gridStyle3 = {
        width: "100%",
        textAlign: "right",
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
          <div style={{ padding:'8em', paddingTop: '0.8em'}}>
              
              <h2 style={{padding: '0.8em'}} >FOOD CART</h2>
              
            <Card className="view-card" style={{ height: "280px" }}>
              <Card.Grid hoverable={false} style={gridStyle1}>
                <Image
                  className="image"
                  width={220}
                  height={180}
                  src={`http://localhost:4000/restaurantadmin/item/image/${this.state.itemId}`}
                  roundedCircle
                />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle2}>
                <Card className="grid-card">
                  <p>
                    <span className="item-name">{this.state.item.name}</span>
                    <br/>
                    <p>{this.state.item.description}</p>
                    <hr/>
                    <span className='price'>{this.state.quantity} x Rs. {this.state.item.price}</span><hr/>
                  </p>
                </Card>
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                
                <Card className="button-card">
                <Space directon='Horizontal' size='large'>
                <span>Quantity : </span>
                <ItemCounter default={1} min={1} max={10} onChange={this.onChange.bind(this)} />
                </Space>
                </Card><hr/>
                <Card className="grid-card card1">
                <span className='price'>Rs. {this.state.quantity * this.state.item.price}</span>
                </Card>
                <hr/>
                <span className='button-span'>
            <Button className='button'  color={'#855b36'}>Remove</Button>
            </span>

              </Card.Grid>
            </Card>
            {/* <Divider/> */}
            <br/>
            
            <Card style={{height:"300px", borderRadius: '5px'}}>
            {/* <Card.Grid hoverable={false} style={gridStyle3}> */}
                {/* <Card className="grid-card"> */}
                    <h2>CART TOTALS</h2>
                    <hr/>
                  <p style={{overflow: "hidden"}}>
                    <span className="item-name" style={{float: 'left'}}>Sub Total</span>
                    <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                  </p>
                  <hr/>
                  <p style={{overflow: "hidden"}}>
                    <span className="item-name"  style={{float: 'left'}}>Grand Total</span>
                    <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                  </p>
                  <hr/>
                  <span className='button-span'>
                  <Button className='button' style={{marginTop: '1em'}} color={'#855b36'} ><a href="/order/checkout" > Proceed to Checkout</a></Button>
                  </span>
                {/* </Card> */}
              {/* </Card.Grid> */}
            </Card>
            <span className='button-span'>
            <a href={`/home`}>
            <Button className='button' ghost style={{margin:'2em', color: '#855b36'}} color={'#fff'} >Continue Shopping</Button></a>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
