import React, {useState} from 'react';
import {CardElement, Elements, useStripe, useElements} from '@stripe/react-stripe-js';
// import React, {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
// import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import "../superAdmin/loginSuperAdmin.css";
import "./checkoutForm.css";
const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#111d2c',
      color: '#111d2c',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#111d2c',
      },
      '::placeholder': {
        color: '#111d2cb2',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const CardField = ({onChange}) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SubmitButton = ({processing, error, children, disabled, onClick}) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="primary submit" ghost
    disabled={processing || disabled}
    onClick={onClick}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const ErrorMessage = ({children}) => (
  <div className="ErrorMessage" role="alert">
    {children}
  </div>
);

const ResetButton = ({onClick}) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    Reset
  </button>
);
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [AmountDetails, setAmount] = useState({
    amount: '',
    name: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: AmountDetails.name,
    });

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      console.log(payload);
      // fetch('/pay/checkoutViaCard', params: { user: AmountDetails, payload}, )
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Order Payment Done
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <Form className="Form" onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <div className="FormRow">
          <label htmlFor="amount" className="FormRowLabel">
            Amount Rs.
          </label>
          <Input
            className="FormRowInput"
            id="amount"
            type="number"
            placeholder="00.00"
            required
            value={AmountDetails.amount}
            onChange={(e) => { setAmount({...AmountDetails, amount: e.target.value})}}
          />
        </div>
      </fieldset>
      <fieldset className="FormGroup">
        <div className="FormRow">
          <label htmlFor="name" className="FormRowLabel">
            Name
          </label>
          <Input
            className="FormRowInput"
            id="name"
            type="text"
            placeholder="enter name"
            required
            value={AmountDetails.name}
            onChange={(e) => { setAmount({...AmountDetails, name: e.target.value})}}
          />
        </div>
      </fieldset>
      <br></br>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      <br></br>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe} onClick={handleSubmit}>
        Pay
      </SubmitButton>
    </Form>
  );
};

export default CheckoutForm;