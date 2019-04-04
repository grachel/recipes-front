import React from 'react';

const ServiceContext = React.createContext(null);

export const withService = Component => props => (
  <ServiceContext.Consumer>
    {service => <Component {...props} service={service} />}
  </ServiceContext.Consumer>
);

export default ServiceContext;