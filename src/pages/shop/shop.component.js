import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';
import {
  firestore,
  convertCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

// higher order componnets
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { onUpdateCollection } = this.props;
    const collectionRef = firestore.collection('collections');

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snaphot) => {
      onUpdateCollection(convertCollectionSnapshotToMap(snaphot));
      this.setState({ loading: false });
    });

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
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onUpdateCollection: (collectionMap) =>
    dispatch(updateCollections(collectionMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
