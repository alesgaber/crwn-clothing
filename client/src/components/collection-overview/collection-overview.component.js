import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionForPreview } from '../../redux/shop/shop.selectors';

import { CollectionsOverviewContainer } from './collection-overview.styles';
// import './collection-overview.styles.scss';

const CollectionOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionOverview);
