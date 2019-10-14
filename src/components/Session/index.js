import React from 'react';
import withAuthentication from './withAuthentication';
import withAuthorization from './withAuthorization';

const AuthUserContext = React.createContext(null);

export { AuthUserContext, withAuthentication, withAuthorization };