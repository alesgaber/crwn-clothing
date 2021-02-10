import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.component';
import { fetchCollectionStart } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { onFetchCollectionsStart } = this.props;

    onFetchCollectionsStart();

    /*
     const collectionRef = firestore.collection('collections');
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snaphot) => {
      onUpdateCollection(convertCollectionSnapshotToMap(snaphot));
      this.setState({ loading: false });
    });
*/
    /* drugi način promise pattern
      collectionRef.get().then(async (snaphot) => {
      onUpdateCollection(convertCollectionSnapshotToMap(snaphot));
      this.setState({ loading: false });
    });
    */

    /* tretji način promise pattern, fileds are very nested
     fetch(
      'https://firestore.googleapis.com/v1/projects/crwn-db-6f309/databases/(default)/documents/collections'
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
    });
    */
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot = null;
  }

  // CollectionOverviewWithSpinner
  render() {
    const { match } = this.props;
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  onFetchCollectionsStart: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
