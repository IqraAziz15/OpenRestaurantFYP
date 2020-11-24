import React, { useEffect,useState } from 'react';
import { Card, Spin } from 'antd';
import "antd/dist/antd.css";
import {useParams} from "react-router-dom";
import axios from "axios";


export default class Orderhistory extends React.Component
{
    
    state = {
        orderId: this.props.orderId,
        customerId: '5fa7fe33910c3a1810eccbc9',
        user:'',
        order:'',
        loading: true,
        itemsDetails: [],
        Total:0,
        showTotal: false,
    }
    // const { orderId } = '804779893';

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



    componentDidMount = async() =>
    {
        this.getCustomer();
        var body = JSON.stringify({ orderId: this.state.orderId });
        const pointerToThis = this;
        await fetch("http://localhost:4000/customer/order/viewOrder/",  {
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => pointerToThis.setState({ order: data, loading: false }));
    };
    date = () =>{
        // const a = Date.now();
        // console.log(a)
        var today = new Date(this.state.order.ordertime);
        return today.toString() 
        // const today = this.state.order.ordertime;

        return(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));
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

    render()
    {
    
        return(
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
                    <div>
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <h4>
                        ORDER SUMMARY
                    </h4>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Order Number</span>
                        <span className='price' style={{float: 'right'}}>{this.state.orderId}</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Status</span>
                        <span className='price' style={{float: 'right'}}>Pending</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Date</span>
                        <span className='price' style={{float: 'right'}}>{this.date()}</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Email</span>
                        <span className='price' style={{float: 'right'}}>{this.state.user.email}</span>
                    </p>
                    <hr/>
                   
                </Card> 
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <h4>
                        CART DETAILS
                    </h4>
                    <hr/>
                    <div>
                        {this.state.itemsDetails.map(item =>
                        <p>
                            <p style={{overflow: "hidden"}}>
                                {/* <span style={{float: 'left'}}>Email</span>
                                <span className='price' style={{float: 'right'}}>{this.state.user.email}</span> */}
                                <div style={{float: 'left'}}>
                                <span className="item-name">{item.name}</span>
                                <br/>
                                <p>{item.description}</p>
                                </div>
                                <div style={{float: 'right'}}>
                                <span className='price'>{item.quantity} x Rs. {item.price ? item.price : item.total_bill}</span>
                                </div>
                                
                            </p> 
                            <hr/>
                        </p> 
                        )}
                    </div>
                </Card>
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <p style={{overflow: "hidden"}}>
                        <h5 style={{float: 'left'}}>Sub Total</h5>
                        <h5 className='price' style={{float: 'right'}}>PKR. {this.state.Total}</h5>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <h6 style={{float: 'left'}}>Discount</h6>
                        <h6 className='price' style={{float: 'right'}}>PKR. 0</h6>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <h4 style={{float: 'left'}}>Total</h4>
                        <h4 className='price' style={{float: 'right'}}>PKR. {this.state.Total}</h4>
                    </p>
                </Card>
                </div>
                )}
            </div>
        )
    }
}