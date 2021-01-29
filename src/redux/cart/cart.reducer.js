import { CartActionTypes } from './cart.types';

const INITIAL_SATATE = {
  hidden: true,
};

const CartReducer = (state = INITIAL_SATATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    default:
      return state;
  }
};

export default CartReducer;
