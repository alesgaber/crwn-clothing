import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';
import CheckOutItem from '../../components/checkout-item/checkout-item.components';
import StripeCheckoutButton from '../../components/stripe-button/strip-button.component';
// import './checkout.styles.scss';
import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
} from './checkout.styles';

const CheckOut = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map((cartItem) => (
      <CheckOutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer>TOTAL {total}€</TotalContainer>
    <WarningContainer>
      *please use following test credit card for payments* <br />
      4242424242424242 - Exp: future date CVV: 123
    </WarningContainer>
    <StripeCheckoutButton price={total} />
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckOut);
