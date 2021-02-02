import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51IG2TrGGR5EHehv8ESQXLtIMoDO90xaRstGI2sdw4EahY5S1Guj7CLPdNpiC14WNMkq60dN63eCTO5WiJRPiibhT00Gjs4JXG1';

  const onToken = (token) => {
    console.log(token);
    alert('Payment succesfull');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
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
