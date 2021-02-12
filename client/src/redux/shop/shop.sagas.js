import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  firestore,
  convertCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';
import { ShopActionTypes } from './shop.types';
import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection('collections');

    const snapshot = yield collectionRef.get();
    const collectionMap = yield call(convertCollectionSnapshotToMap, snapshot);

    yield put(fetchCollectionSuccess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }

  // collectionRef
  //   .get()
  //   .then(async (snaphot) => {
  //     const collectionMap = convertCollectionSnapshotToMap(snaphot);
  //     dispatch(fetchCollectionSuccess(collectionMap));
  //   })
  //   .catch((error) => dispatch(fetchCollectionFailure(error.message)));
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTION_START,
    fetchCollectionAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionStart)]);
}
