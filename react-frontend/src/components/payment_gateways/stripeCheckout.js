import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe("pk_test_51HEBkBAA6YnKro0mXZpOZTmOQOMYTdMlZnvkfVxa9GvKq7vybBYkuKyWib3dIVpJ9IKYPk9l4TSnkHpnAS7Cm9L300TDmPH2NG");

class StripeCheckout extends React.Component {

  state={
    amount: 0,
    orders: []
  }

  componentDidMount = async() => {
      const pointerToThis = this
      var body = JSON.stringify({ orderid:this.props.orderId })
      await fetch(`http://localhost:4000/customer/order/viewcustomerorder`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => pointerToThis.setState({ orders: data, loading: false }));  
      var total = 0;
      console.log(this.state.orders)
      await this.state.orders.forEach(order => {
          total += order.total_bill
          console.log(total)
      })
      await this.setState({amount: total})
      console.log(this.state.amount)
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="App-intro form-containter">
        <h3 className='payment-heading'><center>Checkout Form</center></h3>
        <br /><br />
        <div className="checkout-form-container">
          <Elements stripe={stripePromise}>
            <CheckoutForm orderId={this.props.orderId} amount={this.state.amount}>
            </CheckoutForm>
          </Elements>
        </div>
      </div>
    );
  };
}

StripeCheckout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(StripeCheckout); 
