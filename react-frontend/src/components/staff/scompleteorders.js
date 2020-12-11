import React from "react";
import Pusher from 'pusher-js';
import { Table, List, Pagination, Spin, Card } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';
import axios from 'axios';
import { ListItem } from "@material-ui/core";
import {Dropdown} from 'react-bootstrap';

class CompleteOrders extends React.Component {
  state = {
    user: this.props.user,
    orders: [],
    loading: true,
    itemsDetails: [],
    items: [],
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    // error : PropTypes.object.isRequired
  }

  getAllRestOrdersReady = async () => {
    var pointerToThis = this;
    var body = JSON.stringify({ restid: this.state.user.rest_id, status: 'Complete'});
    await fetch(
      `http://localhost:4000/customer/order/getallrestorderscomplete`,
      {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ orders: data }));
    this.getItems();
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

  componentDidMount = () => {
    var pointerToThis = this;
    this.getAllRestOrdersReady();
    // this.setOrderStatus();
    console.log(this.state.orders)
    const { user } = this.props.auth;
    this.id = setTimeout(() => this.setState({ loading: false }), 2000)
    Pusher.logToConsole = true;

    var pusher = new Pusher('98bd0af8e51670d6785d', {
      cluster: 'ap2'
    });
    console.log(this.props.user)
    var chan = `${this.state.user.rest_id}`;
    var channel = pusher.subscribe(chan);
    channel.bind('orders', function (data) {

      if (data.order != null) {
        // data1 = data1.concat((data.order))
        pointerToThis.setState({ orders: pointerToThis.state.orders.concat(data.order) });
      }
    });
    console.log(this.state.orders)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  handleChange=(event)=>{
    this.setState({value: event.target.value});
  }

  render() {
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
        ) :
          <div class="list-group">
            <h4 style={{ paddingTop: '1.5em' }}>COMPLETE ORDERS</h4>
            <hr />
            <div>
              {this.state.orders.map(order =>
                <div>
                  <div class="list-group-item list-group-item-action">
                    <div style={{ alignContent: 'space-between' }}>
                      <div style={{ display: 'inline' }}>
                        <p>
                          <b style={{paddingRight:'3.75em'}}>Order Id </b>
                          {order.orderid}
                        </p>
                        <p>
                          <b style={{paddingRight:'2.25em'}}>Order Time</b> {order.ordertime}
                        </p>
                        <p>
                          <b style={{paddingRight:'4.65em'}}>Status</b> {order.status}
                        </p>
                        <p>
                          <b style={{paddingRight:'3.5em'}}>Total Bill</b>  Rs.{order.total_bill}
                        </p>
                      </div>
                      {order.ordered_food.map((item, i) =>
                        <div >
                          {this.state.items.map(j =>
                            <div>
                              {item.id == j._id ?
                                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between' }}>
                                  <p>
                                    <b style={{paddingRight:'2.25em'}}>Item Name</b> {j.name}
                                  </p>
                                  <p>
                                    <b style={{paddingRight:'3.5em'}}>Quantity</b>  {item.quantity}
                                  </p>
                                </div>
                                : ''}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                   
                  </div>
                  <br/>
                </div>
              )}
            </div>
            <div>
              {/* <Pagination showSizeChanger defaultCurrent={1} defaultPageSize={10} total={500} onChange={()=>this.onChange} /> */}
            </div>
            <hr />
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(CompleteOrders);