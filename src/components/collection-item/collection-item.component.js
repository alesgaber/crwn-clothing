import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from './collection-item.styles';
// import './collection-item.styles.scss';

const CollectionItem = ({ item, onAddItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}€</PriceContainer>
      </CollectionFooterContainer>
      <AddButton inverted onClick={() => onAddItem(item)}>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToState = (dispatch) => ({
  onAddItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToState)(CollectionItem);
