import React from 'react';
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

import {
  CheckoutItemContainer,
  ImageContainer,
  QuantityContainer,
  TextContainer,
  ArrowButton,
  RemoveButton,
} from './checkout-item.styles';
import './checkout-item.styles.scss';

const CheckOutItem = ({
  cartItem,
  onClearItemFromCart,
  onAddItem,
  onRemoveItem,
}) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt="item" />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div
          className="arrow"
          onClick={() => onRemoveItem(cartItem)}
          onKeyDown={() => onRemoveItem(cartItem)}
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          onClick={() => onAddItem(cartItem)}
          onKeyDown={() => onAddItem(cartItem)}
        >
          &#10095;
        </div>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButton
        onClick={() => onClearItemFromCart(cartItem)}
        onKeyDown={() => onClearItemFromCart(cartItem)}
      >
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onClearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  onAddItem: (item) => dispatch(addItem(item)),
  onRemoveItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckOutItem);
