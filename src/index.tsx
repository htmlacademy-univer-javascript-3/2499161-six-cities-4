import React from 'react';
import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
//import {offers} from './mocks/offers.ts';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchFavorites, checkAuthAction, fetchOffersAction} from './api/api-action.ts';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavorites());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = { store } >
      <App/>
    </Provider>
  </React.StrictMode>
);
