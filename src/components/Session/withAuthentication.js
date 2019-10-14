import React, { useState, useEffect, useContext } from 'react';

import { AuthUserContext } from './index';
import { ServiceContext } from '../Service';

const withAuthentication = Component => {
  function WithAuthentication(props) {
    const [authUser, setAuthUser] = useState(null);
    const service = useContext(ServiceContext.Consumer);

    useEffect(() => {
      const listener = service.auth.onAuthStateChanged(
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

  return WithAuthentication;
};

export default withAuthentication;