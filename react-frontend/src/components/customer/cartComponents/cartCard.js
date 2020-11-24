import React, { Component } from "react";
import "antd/dist/antd.css";
import "../viewComponent/viewItem.css";
import { Divider, Tabs, Spin, Rate, Space, Card, Button, Tooltip, message, InputNumber } from "antd";
import Image from "react-bootstrap/Image";
import '../customer.css';
import axios from 'axios';
import Checkout from './proceedtocheckout';
import RatingComponent from "../reviewRatingComponents/ratingComponent";
import ReviewComponent from "../reviewRatingComponents/reviewComponent";
// import ItemCounter from "../cartComponents/itemCounter";
import ItemCounter from '../../layouts/customerLayout/counter'
const { Meta } = Card;
const { TabPane } = Tabs;

class Cart extends Component {
  state = {
    // itemId: '5f96df9e379eb6263093e39d',
    itemsDetails: [],
    item:"",
    quantity: 1,
    loading: false,
    Total: 0,
    customerId: '5fa7fe33910c3a1810eccbc9',
    itemid: this.props.id,
    user:'',
    showTotal: false,
    quantity: 0,
  };

  onChange = (value) => {
    this.setState({ quantity:value })
  }


  getCustomer = async() => {
    const pointerToThis= this;
    await fetch(`http://localhost:4000/userprofile/customer/getcustomer/${this.state.customerId}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    })
    .then((response) => response.json())
    .then((data) => pointerToThis.setState({ user: data, loading: false }));
    this.cartDisplay();

  }

  componentDidMount() {
    this.getCustomer();
    // var pointerToThis = this;
    // fetch(
    //   `http://localhost:4000/restaurantadmin/item/viewitem/${this.state.itemId}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => pointerToThis.setState({ item: data }));

  }

  cartDisplay = async() => {
    var pointerToThis = this;
    let cartItems = [];
    // message.info('we are inside')
        if (this.state.user && this.state.user.cart.length) {
          // message.success('wooohooo')
          // console.log('a')
            if (this.state.user.cart.length > 0) {
              // console.log('b')
              this.state.user.cart.forEach(item => {
                // console.log('c')
                    cartItems.push(item.id)
                });
                // console.log('d')
                  await this.getCartItems(cartItems, this.state.user.cart)
                  // console.log('e')
                    if(this.state.itemsDetails)  {
                      // console.log('f')
                      console.log(this.state.itemsDetails)
                        if (this.state.itemsDetails.length > 0) {
                          // console.log('g')
                            pointerToThis.calculateTotal(this.state.itemsDetails)
                            // console.log('h')
                        }
                    } 
            }
        }
        // message.success('wooooohoooooo, we are out')
  }

  getCartItems = async (cartItems, userCart) => {
    const pointerToThis = this;
    const body1 = { 
        type : 'array',
        id : cartItems
    }
    const request = await axios.post(`http://localhost:4000/customer/cart/getCartItems`, body1)
        .then(response => {
            console.log(response.data)
            console.log(response)

            //Make CartDetail inside Redux Store 
            // We need to add quantity data to Product Information that come from Product Collection. 

            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, i) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[i].quantity = cartItem.quantity;
                    }
                })
            })
            console.log(response.data)
            pointerToThis.setState({itemsDetails: response.data});
            return response.data;
        });
        console.log(request)
    return request;

   
}

  calculateTotal = (cartDetail) => {
    let total = 0;
    console.log(cartDetail)
    cartDetail.map(item => {
      var itemprice = item.price ? item.price : item.total_bill
        total += parseInt(itemprice, 10) * item.quantity
        console.log('totalllll '+ total)
    });

    this.setState({Total: total})
    this.setState({showTotal: true})
}


removeFromCartNew = async (productId) => {
  // var response = await this.removeCartItem(productId)
  const body2 = { 
    cid : this.state.customerId,
    itemid : productId 
  }
  const request = await axios.post(`http://localhost:4000/customer/cart/removeFromCart`, body2)
      .then(response => {
          if (response.status == 200 ){
            var user = this.state.user;
            user.cart = response.data.cart;
            this.setState({user: user});
            this.cartDisplay();
          } 
      });
}

  
  onChange(value) {
        // this.setState({Total: value});
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
              {this.state.itemsDetails.map(item =>
            <Card className="view-card" style={{ height: "280px", marginBottom: '2em' }}>
            
            
              <Card.Grid hoverable={false} style={gridStyle1}>
                <Image
                  className="image"
                  width={190}
                  height={160}
                  src={item.price ? `http://localhost:4000/restaurantadmin/item/image/${item._id}` : `http://localhost:4000/restaurantadmin/deal/image/${item._id}`}
                  roundedCircle
                />
              </Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle2}>
                <Card className="grid-card">
                  <p>
                    <span className="item-name">{item.name}</span>
                    <br/>
                    <p>{item.description}</p>
                    <hr/>
                    <span className='price'>{item.quantity} x Rs. {item.price ? item.price : item.total_bill}</span><hr/>
                  </p>
                </Card>
              </Card.Grid>
           
               
              <Card.Grid hoverable={false} style={gridStyle}>
                
                <Card className="button-card">
                <Space directon='Horizontal' size='large'>
                <span>Quantity : </span>
                {/* <ItemCounter default={item.quantity} min={1} max={20} onChange={this.onChange.bind(this)} /> */}
                <InputNumber min={1} max={10} defaultValue={item.quantity} onChange={this.onChange} />
                </Space>
                </Card><hr/>
                <Card className="grid-card card1">
                {/* <span className='price'>Rs. {item.price ? item.price : item.total_bill}</span> */}
                <span className='price'>Rs. {item.price ? item.price * item.quantity : item.total_bill * item.quantity}</span>

                {/* <span className='price'>Rs. {this.state.Total}</span> */}

                </Card>
                <hr/>
                <span className='button-span'>
            <Button className='button'  color={'#855b36'} onClick={()=>this.removeFromCartNew(item._id)}>Remove</Button>
            {/* onClick={()=>this.removeFromCartNew(item._id)} */}
            </span>

              </Card.Grid>
            </Card>
            
            )}

                
           
            {/* <Divider/> */}
            <br/>
            
             <Card style={{height:"300px", borderRadius: '5px'}}>
            {/* <Card.Grid hoverable={false} style={gridStyle3}> */}
                {/* <Card className="grid-card"> */}
                    <h2>CART TOTALS</h2>
                    <hr/>
                  <p style={{overflow: "hidden"}}>
                    <span className="item-name" style={{float: 'left'}}>Sub Total</span>
                    <span className='price' style={{float: 'right'}}>Rs. {this.state.Total}</span>
                  </p>
                  <hr/>
                  <p style={{overflow: "hidden"}}>
                    <span className="item-name"  style={{float: 'left'}}>Grand Total</span>
                    <span className='price' style={{float: 'right'}}>Rs. {this.state.Total}</span>
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
