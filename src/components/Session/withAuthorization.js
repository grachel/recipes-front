import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { AuthUserContext } from './index';
import { withService} from '../Service';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  function WithAuthorization(props) {

    useEffect(() => {
      const listener = props.service.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            props.history.push(ROUTES.SIGN_IN);
          }
        },
      );

      return function cleanup() {
        listener();
      };
    });

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          condition(authUser) ? <Component {...props} authUser={authUser} /> : null
        }
      </AuthUserContext.Consumer>
    );
  }

  return compose(
    withRouter,
    withService,
  )(WithAuthorization);
};

export default withAuthorization;