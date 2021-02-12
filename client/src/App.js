import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import CheckOut from './pages/checkout/checkout.component';

import SigninAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.action';

import './App.css';

const App = ({ onCheckUserSession, currentUser }) => {
  useEffect(() => {
    onCheckUserSession();
  }, [onCheckUserSession]);

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
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
