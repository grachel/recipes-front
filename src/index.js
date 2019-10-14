import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ServiceContext, Service } from './components/Service';

ReactDOM.render(
  <ServiceContext.Provider value={new Service()}>
    <App />
  </ServiceContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
