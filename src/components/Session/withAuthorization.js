import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { AuthUserContext } from './index';
import { ServiceContext} from '../Service';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  function WithAuthorization(props) {
    const authUser = useContext(AuthUserContext)
    const service = useContext(ServiceContext)

    useEffect(() => {
      const listener = service.auth.onAuthStateChanged(
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
        <div>{
          condition(authUser) ? <Component {...props} authUser={authUser} /> : null
        }</div>
    );
  }

  return compose(
    withRouter,
  )(WithAuthorization);
};

export default withAuthorization;