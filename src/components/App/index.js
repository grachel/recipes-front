import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import PasswordChangePage from '../PasswordChange';
import HomePage from '../Home';
import { withAuthentication } from '../Session';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route exact path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={ROUTES.PASSWORD_CHANGE} component={PasswordChangePage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
    </div>
  </Router>
);

export default withAuthentication(App);