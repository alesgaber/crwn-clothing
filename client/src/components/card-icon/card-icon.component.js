import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCountContainer,
} from './card-icon.styles';
// import './card-icon.styles.scss';

const CardIcon = ({ onToggleHidden, itemCount }) => (
  <CartIconContainer onClick={onToggleHidden} onKeyDown={onToggleHidden}>
    <ShoppingIconContainer />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartIconContainer>
);

const mapDispatchToProps = (dispatch) => ({
  onToggleHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CardIcon);
