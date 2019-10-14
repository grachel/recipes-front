import React, { useState, useEffect } from 'react';

import { AuthUserContext } from './index';
import { withService } from '../Service';

const withAuthentication = Component => {
  function WithAuthentication(props) {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      const listener = props.service.auth.onAuthStateChanged(
        authUser => {
          setAuthUser(authUser);
        },
      );

      return function cleanup() {
        listener();
      };
    });

    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );

  }

  return withService(WithAuthentication);
};

export default withAuthentication;