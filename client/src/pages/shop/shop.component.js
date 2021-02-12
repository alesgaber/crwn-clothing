import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.component';
import { fetchCollectionStart } from '../../redux/shop/shop.actions';

const ShopPage = ({ onFetchCollectionsStart, match }) => {
  useEffect(() => {
    onFetchCollectionsStart();
  }, [onFetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverviewContainer}
      />
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onFetchCollectionsStart: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
