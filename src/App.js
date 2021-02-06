import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { setCurrentUser } from './redux/user/user.action';

import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import CheckOut from './pages/checkout/checkout.component';

import SigninAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {
  auth,
  createUserProfileDocument,
  addCollectionAndDocuments,
} from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionForPreview } from './redux/shop/shop.selectors';

import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { onSetCurrentUser, collectionArray } = this.props;

    // firebase return unsubscribe function, we use it in componentWillUnmount() to unsubscribe
    this.unsubscribeFromAuth = auth.onAuthStateChanged(
      async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot((snapshot) => {
            onSetCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            });
          });
        } else {
          // userAuth === null, reset state
          onSetCurrentUser(userAuth);

          // add collection to firestore
          /*
         addCollectionAndDocuments(
          'collections',
          collectionArray.map(({ title, items }) => ({
            title,
            items,
          }))
        );
        */
        }
      },
      (error) => console.log(error)
    );
  }

  componentWillUnmount() {
    // unsubscribe
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOut} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SigninAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSetCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
