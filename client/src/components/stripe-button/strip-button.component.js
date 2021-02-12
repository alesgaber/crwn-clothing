import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51IG2TrGGR5EHehv8ESQXLtIMoDO90xaRstGI2sdw4EahY5S1Guj7CLPdNpiC14WNMkq60dN63eCTO5WiJRPiibhT00Gjs4JXG1';

  const onToken = (token) => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert('Payment was succesfull.');
      })
      .catch((error) => {
        console.log('PAyment error:', JSON.parse(error));
        alert(
          'There was an issue with yout payment. Please sure you use the provided credit card.'
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      currency="EUR"
      description={`Your total is ${price}€`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
