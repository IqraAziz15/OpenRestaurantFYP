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
import CheckoutForm  from "./checkoutForm";

const stripePromise = loadStripe("pk_test_51HEBkBAA6YnKro0mXZpOZTmOQOMYTdMlZnvkfVxa9GvKq7vybBYkuKyWib3dIVpJ9IKYPk9l4TSnkHpnAS7Cm9L300TDmPH2NG");

class StripeCheckout extends React.Component{

  render(){
        const { user } = this.props.auth;
  return (
      <div className="App-intro form-containter">
      <h1>Checkout Form</h1>
      <br></br>
    <Elements stripe={stripePromise}>
      <CheckoutForm>
      </CheckoutForm>
    </Elements></div>
  );
};
}

StripeCheckout.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = ( state ) => ({
	auth: state.auth,
});

export default connect( mapStateToProps   )( StripeCheckout ); 
