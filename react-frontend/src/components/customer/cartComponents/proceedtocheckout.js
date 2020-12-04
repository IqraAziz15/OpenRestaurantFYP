import React from 'react';
import "antd/dist/antd.css";
import { Input, Radio, Button } from 'antd';
import { Divider, Tabs, Spin, Rate, Space, Card, Tooltip, message } from "antd";
import Image from "react-bootstrap/Image";
import axios from 'axios';
import { Redirect } from 'react-router';
import "../viewComponent/viewItem.css";

export default class Proceedtocheckout extends React.Component 
{
      state = {
        value: 1,
        // itemId: '5f96df9e379eb6263093e39d',
        itemsDetails: [],
        item:"",
        Total: 0,
        quantity: 1,
        customerId: '5fa7fe33910c3a1810eccbc9',
        showTotal: false,
        loading: false,
        user:'',
        random: null,
        redirect: false,
        orderId: ''
      };
    
      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };
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
  
  setCartLength = () => {
    var count = 0;
      if(this.state.user.cart.length > 0 ){
      this.state.user.cart.forEach((rest) => {
        count = count + rest.rest.length;
      });
      this.setState({ cart_length: count });
    }
  };


    componentDidMount() {
        this.getCustomer();
       
      }

    cartDisplay = async() => {
    await this.setCartLength();
    var pointerToThis = this;
    let cartItems = [];
    let userCart = [];
    // message.info('we are inside')
        if (this.state.user && this.state.cart_length) {
          // message.success('wooohooo')
          // console.log('a')
            if (this.state.cart_length > 0) {
              // console.log('b')
              this.state.user.cart.forEach(rest => {
                // console.log('c')
                  rest.rest.forEach(item => {
                    cartItems.push(item.id);
                    userCart.push({id: item.id, quantity:item.quantity})
                  })
                    
                });
                // console.log('d')
                  await this.getCartItems(cartItems, userCart)
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


    placeOrder = () =>{
      var pointerToThis = this;
      let { subname, subid } = this.state;
      
      var body = {
        orderid: this.randomnumbergenerator(),
        customer_id: this.state.customerId,
        ordered_food: this.state.user.cart,
        total_bill: this.state.Total,
      }
          axios.post('http://localhost:4000/customer/order/addOrder', body, {
              headers: {
                  "content-type": "application/json"
              }
          }).then(res => {
              // pointerToThis.setState({ subid: res.data._id });
              alert('Order Added Successfully')
              this.setState({redirect: true, orderId: body.orderid});
              console.log(res)
          })
              .catch(err => console.log(err))

      
    }

    randomnumbergenerator = () => {
      const min = 1000000;
      const max = 1000000000;
      const rand = Math.round(min + Math.random() * (max - min));
      return rand;
  }

    render()
    {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };

          const gridStyle1 = {
            width: "40%",
            marginTop: "0em",
            marginLeft: '1em',
            textAlign: "center",
            justifyContent: "center",
            borderWidth: 0,
          };
          const gridStyle2 = {
            width: "45%",
            textAlign: "left",
            justifyContent: "center",
            borderWidth: 0,
          };
          if (this.state.redirect && this.state.value==1) {
            return <Redirect push to={`/order/payment/${this.state.orderId}`} />;
          }
          else if (this.state.redirect  && this.state.value==2) {
            return <Redirect push to={`/place/order/${this.state.orderId}`} />;
          }
        return(
                <div style={{overflow: 'hidden'}}>
                    <br/><br/>
                    <h4 style={{marginLeft: '1em', paddingBottom: '0.5em'}}>Order Summary</h4>
                    
                    <div style={{ float: 'left', marginLeft: '2em' , width: '45%',  clear: 'left'}}>
                    {this.state.itemsDetails.map(item =>
                    <div>
                    <Card className="view-card" >
                    <Card.Grid hoverable={false} style={gridStyle1}>
                        <Image
                        className="image"
                        width={170}
                        height={150}
                        src={item.price ? `http://localhost:4000/restaurantadmin/item/image/${item._id}` : `http://localhost:4000/restaurantadmin/deal/image/${item._id}`}                        roundedCircle
                        />
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={gridStyle2}>
                        <Card className="grid-card" style={{marginTop: '0.8em'}}>
                        <p>
                            <span className="item-name">{item.name}</span>
                            <br/>
                            <p>{item.description}</p>
                            <hr/>
                            <span className='price'>{item.quantity} x Rs. {item.price ? item.price : item.total_bill}</span><hr/>
                        </p>
                        </Card>
                    </Card.Grid>    
                    </Card>
                    <br/>
                    </div>
                    )}

                    <br/>
{/* style={{ float: 'Left' , marginLeft:'2em', marginTop: '2em', height:"175px", borderRadius: '5px', width: '45%', clear: 'Left'}} */}
                    <Card>
                                <h5>CART TOTALS</h5>
                                <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Sub Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.Total}</span>
                            </p>
                            <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Grand Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.Total}</span>
                            </p>
                            <hr/>
                    </Card>
                    </div>
                <div style={{ float: 'right', padding:'2em', paddingTop:'0em', marginRight: '4em', width: '35em',  textAlign: 'Left',overflow: 'hidden'}}>
            
                <h6>Name</h6>
                <Input 
                    placeholder="Name"
                    type="text"
                    name="name"
                />
                <br/><br/>
                <h6>Email</h6>
                 <Input 
                    // placeholder="Email"
                    type="email"
                    name="email"
                    value={this.state.user.email}
                    disabled
                />
                <br/><br/>
                <h6>Phone Number</h6>
                <Input 
                    placeholder="Phonenumber"
                    type="phonenumber"
                    name="phonenumber"
                />
                <br/><br/>
                <h6>Gift Card or Discount Coupon</h6>
                <Input 
                    placeholder="Gift Card or Discount Coupon"
                    type="text"
                    name="giftcard"
                />
                <br/><br/>
                <h6>Payment</h6>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio style={radioStyle} value={1}>
                        Credit Card
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                        Cash on Delivery(COD)
                    </Radio>
                </Radio.Group>
                <br/><br/>
                <span className='button-span'>
                {/* <a href={`/place/order/`}> */}
                <Button className='button'  color={'#855b36'} onClick={()=>this.placeOrder()}>Place Order</Button>
                {/* </a> */}
                </span>
            </div>
            
                    {/* <br />
                    <div style={{paddingLeft:'2em', marginTop: '2em',  overflow: 'hidden'}}>
                        <Card style={{float: 'Left' ,height:"175px", borderRadius: '5px', width: '46%', clear: 'Left'}}>
                                <h5>CART TOTALS</h5>
                                <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Sub Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                            </p>
                            <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Grand Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                            </p>
                            <hr/>
                        </Card>
                    </div>      
                                   */}
            
            </div>
            
        )
    }
}

