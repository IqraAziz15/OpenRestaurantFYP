import React from 'react';
import "antd/dist/antd.css";
import {Card} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from "antd";
import axios from 'axios';

class OrdersHistory extends React.Component
{
    state = {
        orders: [],
        loading:true,
        items:[],

    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        // error : PropTypes.object.isRequired
    }

    componentDidMount=async()=>
    {
        while (this.props.auth.isLoading){}
        await this.setState({user: this.props.auth.user})
        this.getAllCustomerOrders();
    }

    getAllCustomerOrders = async () => {
        var pointerToThis = this;
        var body = JSON.stringify({ cid: this.props.auth.user._id });
        await fetch(
          `http://localhost:4000/customer/order/viewallcustomerorders`,
          {
            method: "POST",
            body,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => pointerToThis.setState({ orders: data, loading:false }));
          await this.getItems();
    }

    getItems = async () => {
        var item = []
        this.state.orders.forEach((item_array) => {
          item_array.ordered_food.forEach((i) => {
            item.push(i.id)
          })
        })
        var body = {
          type: 'array',
          id: item
        }
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        var pointerToThis = this;
        await axios.post('http://localhost:4000/customer/cart/getCartItems', body, config)
          .then(res => {
            pointerToThis.setState({ items: res.data, loading: false });
            // alert(' Order Viewed')
            console.log(res)
            console.log(res.data)
            console.log(this.state.items)
          })
    
          .catch(err => console.log(err))
      }    

    render()
    {
        return(
            <div>
                {this.state.loading || this.props.auth.isLoading ? (
                <center>
                    <Spin
                    className="spinner"
                    tip="Loading...Please Wait"
                    size="large"
                    />
                </center>
                ) :
                <div>
                    <h4 style={{paddingTop:'2em'}}>ORDERS HISTORY</h4>
                    <Card>
                    {this.state.orders.map(order =>
                        <div>
                            <p>
                            <b>Order Id </b>
                            {order.orderid}
                            </p>
                            <p>
                            <b>Order Time</b> {order.ordertime}
                            </p>
                        
                        {order.ordered_food.map((item, i) =>
                            <div>
                                {this.state.items.map(j =>
                                    <div>
                                        <b>{j.name}</b>({item.quantity} x Rs. {item.price ? item.price : item.total_bill}) ,
                                    </div>
                                )}
                            </div>
                        )}
                        </div>
                    )}
                    </Card>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });
export default connect(mapStateToProps, null)(OrdersHistory);