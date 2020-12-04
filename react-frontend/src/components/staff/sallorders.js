import React from "react";
import Pusher from 'pusher-js';
import {Spin} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Allorders extends React.Component
{
  state = {
    orders:[],
    loading: true
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    // error : PropTypes.object.isRequired
}
  
  componentDidMount = () => 
  {
    var pointerToThis = this;
    fetch(
      `http://localhost:4000/customer/order/getallorders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ orders: data, loading:false }));
      Pusher.logToConsole = true;

      var pusher = new Pusher('98bd0af8e51670d6785d', {
        cluster: 'ap2'
      });
      
      var channel = pusher.subscribe('rest-name');
      channel.bind('orders', function(data) {

        if(data.order != null){
        // data1 = data1.concat((data.order))
        pointerToThis.setState({ orders: pointerToThis.state.orders.concat(data.order)});
        }
      });
  }

//   date = () =>{
//     // const a = Date.now();
//     // console.log(a)
//     var today = new Date(this.state.order.ordertime);
//     return today.toString() 
//     // const today = this.state.order.ordertime;

//     return(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));
// }

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
                ) :
        <div>
          <h4>MY ORDERS</h4>
          {this.state.orders.map(order => 
          <div>
            <p>
              {/* Order Time {order.ordertime} */}
            </p>
            <p>
            {/* Order Items {order.ordered_food} */}
            </p>
            <p>
            Order Id {order.orderid}
            </p>
          </div>
            )}
        </div>
      }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Allorders);