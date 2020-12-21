import React from 'react';
import "antd/dist/antd.css";
import { Card, Spin, Button } from 'antd';
import NoOrder from './noorder';
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

class CurrentOrders extends React.Component
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

    componentDidMount = async () => {
        while (this.props.auth.isLoading){}
        this.setState({redirect: true})
        if(this.props.auth.isAuthenticated){
          const body = {
            cid: this.props.auth.user._id
          }
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          var pointerToThis = this;
          await axios.post('http://localhost:4000/customer/order/viewallcustomerorders/pending', body, config)
            .then(res => {
              if(res.data.length > 0){ 
                pointerToThis.setState({ orders: res.data});
                this.getItems()
              }
              else {
                pointerToThis.setState({redirect1: true});
              }
              // alert(' Order Viewed')
              console.log(res)
              console.log(res.data)
            })
            .catch(err => console.log(err))
        }
    }

    getItems = async () => {
        var items = []
        this.state.orders.forEach((item_array) => {
          item_array.ordered_food.forEach((i) => {
            items.push(i.id)
          })
        })
        var body = {
          type: 'array',
          id: items
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
            this.mergeData();
          })
    
          .catch(err => console.log(err))
      }    
    mergeData = async () => {
      await this.state.orders.forEach(order => {
        order.ordered_food.forEach((i, k) => {
          this.state.items.forEach(item => {
            if(item._id == i.id){
              item.quantity = i.quantity
              order.ordered_food[k] = item
            }
          })
        })
      })
      var new_array = []
      var orders = this.state.orders
      await orders.forEach((order, o) => {
        var new_order = { 
            orderid: order.orderid,
            giftcoupon: order.giftcoupon,
            rest_ids: [
              order.rest_id,
            ],
            ordered_food: 
              order.ordered_food
            ,
            total_bill: order.total_bill,
            comments: [
              order.comments
            ],
            payment_method: order.payment_method,
            ordertime: order.ordertime,
          }
        orders = this.arrayRemove(orders, order)
        orders.forEach((ord, i) => {
          if(i != o && order.orderid == ord.orderid){
            new_order.rest_ids.push(ord.rest_id)
            new_order.ordered_food= new_order.ordered_food.concat(ord.ordered_food)
            new_order.comments= new_order.comments.concat(ord.comments)
            new_order.total_bill = new_array.total_bill + ord.total_bill
            orders = this.arrayRemove(orders, ord)
          }
        })
        new_array.push(new_order)
      })
      console.log(new_array)
      await this.setState({orders: new_array})
    }
    arrayRemove(arr, value) { 
    
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }
    render()
    {
      const gridStyle = {
      width: "70%",
      textAlign: "left",
      justifyContent: "center",
      paddingBottom: 0,
      borderWidth: 0,
      };
      const gridStyle1 = {
        width: "30%",
        textAlign: "center",
        justifyContent: "center",
        borderWidth: 0,
        paddingTop: '5%',
        paddingBottom: 0,
      };
      const gridStyle2 = {
        width: "70%",
        textAlign: "left",
        justifyContent: "center",
        paddingRight: "10%",
        borderWidth: 0,
      };
      const gridStyle3 = {
        width: "30%",
        justifyContent: "center",
        borderWidth: 0,
      };
       const {isAuthenticated, user} = this.props.auth;
        if(!isAuthenticated && this.state.redirect) {
        return (<Redirect push to='/login'/>)
        }
        if(this.state.redirect1 && this.state.orders.length < 1) {
        return (<NoOrder/>)
        }
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
                    <br/>
                    <h4 style={{paddingTop:'2em', }}>CURRENT ORDERS</h4>
                    <br/>
                    {this.state.orders.map(order =>
                     (order.total_bill ?
                    <div style={{paddingRight: '30em'}}>
                        <Card >
                        <Card.Grid hoverable={false} style={gridStyle}>
                        <p>Order Id: <strong>{order.orderid}</strong></p>
                        <p>Order Time: <strong>{order.ordertime}</strong> </p>
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle1}>
                          <center><h3><span style={{fontWeight: '100'}}>Total: &nbsp;</span> {order.total_bill}</h3></center>
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle2}>
                        <span><b>Order:&nbsp; </b></span>{order.ordered_food.map((item, i) =>
                            <span>
                                {item.name}{(order.ordered_food.length -1 == i) ? "": <span>, &nbsp;</span>}
                            </span>
                        )}
                        </Card.Grid>
                        <Card.Grid hoverable={false} style={gridStyle3}>
                        <Button style={{marginRight: '30%'}} className='button'><Link to={`/myorders/order/${order.orderid}`}>View Details</Link></Button>
                        </Card.Grid>
                        </Card>
                      <br/>
                      </div>
                     : '')
                    )}
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  });
export default connect(mapStateToProps, null)(CurrentOrders);