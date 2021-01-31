import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './card-icon.styles.scss';

const CardIcon = ({ onToggleHidden, itemCount }) => (
  <div className="cart-icon">
    <ShoppingIcon onClick={onToggleHidden} />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  onToggleHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardIcon);
