import { ShopActionTypes } from './shop.types';
import {
  firestore,
  convertCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionStartAsync = () => (dispatch) => {
  const collectionRef = firestore.collection('collections');

  dispatch(fetchCollectionStart());

  collectionRef
    .get()
    .then(async (snaphot) => {
      const collectionMap = convertCollectionSnapshotToMap(snaphot);
      dispatch(fetchCollectionSuccess(collectionMap));
    })
    .catch((error) => dispatch(fetchCollectionFailure(error.message)));
};
